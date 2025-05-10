import { Conversation, ModelOptions, Options, Variable } from '@/api/ai/chat';
import useWebSocket from '@/hook/useWebSocket';
import { Chat } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ChatInput, { ChatInputApi, SendParam } from './ChatInput';
import useAIMessageApi, { AIMessage } from '@/api/ai/message';
import { Message } from '@douyinfe/semi-ui/lib/es/chat/interface';

const roleInfo = {
  user: {
    name: 'user',
    avatar:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
  },
  assistant: {
    name: 'assistant',
    avatar:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png',
  },
  system: {
    name: 'system',
    avatar:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png',
  },
};

type Order = {
  message: string;
  role: AIMessage['role'];
};

type WsMessage = {
  agent: string;
  instructions: Order[];
  modelOptions: ModelOptions;
  executionMode: Conversation['executionMode'];
  options: Options;
  variable: Variable;
};

type Output = {
  id: string;
  conversationId: string;
  sessionId: string;
  agent: string;
  createAt: number;
  role: AIMessage['role'];
  message: string;
  executionMode: Conversation['executionMode'];
  status: 'complete' | 'incomplete' | 'error';
  metadata: Record<string, any>;
};

const WebsocketConversation: React.FC<{ conversation: Conversation }> = ({
  conversation,
}) => {
  const { id, sessionId, options, modelOptions, agent, executionMode } =
    conversation;
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const websocket = useMemo(
    () => useWebSocket(`/api/ai/ws/chat/${conversation.id}`),
    [conversation.id],
  );

  const messageApi = useAIMessageApi();

  const chatInputApiRef = useRef<ChatInputApi>();

  useEffect(() => {
    websocket.onmessage = (evt) => {
      const data = evt.data;
      const output: Output = JSON.parse(data);

      // find existence message
      const index = chatMessages.findIndex((msg) => msg.id === output.id);

      if (index > -1) {
        const newChatMessages = [...chatMessages];
        const exist = newChatMessages[index];
        exist.content = exist.content + output.message;
        exist.status = output.status;
        setChatMessages(newChatMessages);
      } else {
        const newChatMessages: Message[] = [
          ...chatMessages,
          {
            role: output.role,
            id: output.id,
            content: output.message,
            status: output.status,
          },
        ];

        setChatMessages(newChatMessages);
      }
    };

    // loading current conversation message
    messageApi.list({ entity: { chatId: conversation.id } }).then((res) => {
      if (res.code === 200) {
        const messages = res.data || [];
        const initialChatMessages = messages.map(convertToChatMessage);

        setChatMessages(initialChatMessages);
      }
    });

    return () => {
      websocket.close();
      chatInputApiRef.current?.clear();
    };
  }, [conversation.id]);

  const convertToChatMessage = useCallback(
    (message: Partial<AIMessage>): Message => {
      return {
        role: message.role,
        id: message.id,
        createAt:
          message.createdTime && new Date(message.createdTime).getTime(),
        content: message.content,
      };
    },
    [],
  );

  const createInput = useCallback((param: SendParam): WsMessage => {
    return {
      instructions: [{ message: param.text, role: 'user' }],
      agent,
      options,
      modelOptions,
      executionMode,
      variable: {},
    };
  }, []);

  return (
    <Chat
      chats={chatMessages}
      roleConfig={roleInfo}
      showStopGenerate={true}
      renderInputArea={(props) => {
        return (
          <ChatInput
            {...props}
            options={conversation.options}
            modelOptions={conversation.modelOptions}
            getChatInputApi={(api) => (chatInputApiRef.current = api)}
            onSend={(param) => {
              const input = createInput(param);
              websocket.send(JSON.stringify(input));
            }}
          />
        );
      }}
    />
  );
};

export default WebsocketConversation;
