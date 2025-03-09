import { Conversation } from '@/api/ai/chat';
import useWebSocket from '@/hook/useWebSocket';
import { IconPaperclip } from '@douyinfe/semi-icons';
import { Chat, Select } from '@douyinfe/semi-ui';
import { useEffect } from 'react';
import ChatInput from './ChatInput';

const roleInfo = {
  user: {
    name: 'User',
    avatar:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
  },
  assistant: {
    name: 'Assistant',
    avatar:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png',
  },
  system: {
    name: 'System',
    avatar:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png',
  },
};

const WebsocketConversation: React.FC<{ conversation: Conversation }> = ({
  conversation,
}) => {
  const websocket = useWebSocket(`/api/ai/ws/chat/${conversation.id}`);

  useEffect(() => {
    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div className="flex flex-row">
      <Select value="ChatGTP4" className="mr-auto"></Select>
      <Chat
        placeholder=""
        style={{ width: '100%' }}
        roleConfig={roleInfo}
        showStopGenerate={true}
        renderInputArea={(props) => {
          return <ChatInput />;
        }}
      />
      <Select value="Agent" className="ml-auto"></Select>
    </div>
  );
};
