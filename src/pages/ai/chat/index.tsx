import { directGetIcon } from '@/components/icon';
import { Button, Divider, Select } from '@douyinfe/semi-ui';
import { Chat } from '@douyinfe/semi-ui';

const defaultMessage = [
  {
    role: 'system',
    id: '1',
    createAt: 1715676751919,
    content: "Hello, I'm your AI assistant.",
  },
  {
    role: 'user',
    id: '2',
    createAt: 1715676751919,
    content: '介绍一下 semi design',
  },
  {
    role: 'assistant',
    id: '3',
    createAt: 1715676751919,
    content:
      'Semi Design 是由抖音前端团队和MED产品设计团队设计、开发并维护的设计系统',
  },
];

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

const ChatPage = () => {
  return (
    <div className="flex flex-row w-[100%] h-[100%] gap-">
      <div className="flex flex-col gap-2 p-2 bg-[var(--semi-color-fill-0)] w-[15%] h-[100%] max-h-[100%] overflow-y-auto">
        <Button
          block
          icon={directGetIcon('IconCopyAdd')}
          contentClassName="text-base"
        >
          新建会话
        </Button>
        <Divider />
      </div>
      <div className="flex flex-row w-[85%] h-[100%] max-h-[100%] overflow-y-auto p-4">
        <Select value="ChatGTP4" className="mr-auto"></Select>
        <Chat
          mode="bubble"
          style={{ width: '100%' }}
          chats={[...defaultMessage]}
          roleConfig={roleInfo}
          showClearContext
        />
        <Select value="Agent" className="ml-auto"></Select>
      </div>
    </div>
  );
};

export default ChatPage;
