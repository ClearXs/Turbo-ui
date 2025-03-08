import useWebSocket from '@/hook/useWebSocket';
import { IconPaperclip } from '@douyinfe/semi-icons';
import {
  Button,
  ButtonGroup,
  Chat,
  Divider,
  Input,
  Select,
  TextArea,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import React, { useEffect } from 'react';
import ConversationContext from './conversation-context';
import { Conversation } from '@/api/ai/chat';
import { observer } from 'mobx-react';

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

export type ConversationProps = {
  context: ConversationContext;
};

const ConversationPage: React.FC<ConversationProps> = ({ context }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[100%] w-[100%] gap-10">
      <Typography.Title>Welcome Luna Agent</Typography.Title>
      <Typography.Paragraph>
        我是你的私有助手，你有什么疑问都可以询问我
      </Typography.Paragraph>

      <div className="w-[50%]">
        <TextArea></TextArea>
      </div>
    </div>
  );
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
        sendHotKey="enter"
        showStopGenerate={true}
        renderInputArea={(props) => {
          return (
            <Input
              {...props}
              height="50px"
              suffix={
                <div className="flex flex-row gap-1">
                  <ButtonGroup>
                    <Button
                      theme="borderless"
                      icon={<IconPaperclip />}
                    ></Button>
                  </ButtonGroup>
                  <Divider></Divider>
                  <Tooltip content="发送">
                    <Button
                      theme="borderless"
                      icon={<span className="icon-[mynaui--send]"></span>}
                    ></Button>
                  </Tooltip>
                </div>
              }
            />
          );
        }}
      />
      <Select value="Agent" className="ml-auto"></Select>
    </div>
  );
};

export default observer(ConversationPage);
