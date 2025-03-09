import { Button, Card, Col, Row, Tooltip, Typography } from '@douyinfe/semi-ui';
import React from 'react';
import ConversationContext from './conversation-context';
import { observer } from 'mobx-react';
import ChatInput from './components/ChatInput';
import IconButton from '@/components/button/IconButton';
import useChatApi from '@/api/ai/chat';

export type ConversationProps = {
  context: ConversationContext;
};

const Conversation: React.FC<ConversationProps> = ({ context }) => {
  return (
    <div className="flex flex-col h-[100%] w-[100%]">
      <div className="flex flex-col justify-center items-center gap-10">
        <Typography.Title>Welcome Turbo Agent</Typography.Title>
        <Typography.Paragraph>
          我是你的私有助手，你有什么疑问都可以询问我
        </Typography.Paragraph>

        <div className="flex flex-col justify-start w-[60%]">
          <div className="flex flex-row items-center">
            <Typography.Text>向您推荐:</Typography.Text>
            <Tooltip content="刷新">
              <IconButton
                className="ml-auto"
                icon={<span className="icon-[mingcute--refresh-3-fill]" />}
              ></IconButton>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 w-[100%]">
              <Card shadows="hover" className="flex-1">
                <Card.Meta
                  title="翻译家"
                  avatar={
                    <span className="icon-[majesticons--translate] h-6 w-6" />
                  }
                ></Card.Meta>
                <Typography.Text type="primary" ellipsis>
                  帮我翻译一下这段英文，谢谢
                </Typography.Text>
              </Card>
              <Card shadows="hover" className="flex-1">
                <Card.Meta
                  title="翻译家"
                  avatar={
                    <span className="icon-[majesticons--translate] h-6 w-6" />
                  }
                ></Card.Meta>
                <Typography.Text type="primary" ellipsis>
                  帮我翻译一下这段英文，谢谢
                </Typography.Text>
              </Card>
            </div>
            <div className="flex flex-row gap-2 w-[100%]">
              <Card shadows="hover" className="flex-1">
                <Card.Meta
                  title="翻译家"
                  avatar={
                    <span className="icon-[majesticons--translate] h-6 w-6" />
                  }
                ></Card.Meta>
                <Typography.Text type="primary" ellipsis>
                  帮我翻译一下这段英文，谢谢
                </Typography.Text>
              </Card>
              <Card shadows="hover" className="flex-1">
                <Card.Meta
                  title="翻译家"
                  avatar={
                    <span className="icon-[majesticons--translate] h-6 w-6" />
                  }
                ></Card.Meta>
                <Typography.Text type="primary" ellipsis>
                  帮我翻译一下这段英文，谢谢
                </Typography.Text>
              </Card>
            </div>
          </div>
        </div>

        <div></div>
      </div>
      <div className="w-[100%] mt-auto flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Button
            theme="borderless"
            icon={<span className="icon-[mingcute--translate-2-ai-fill]" />}
          >
            翻译
          </Button>
          <Button
            theme="borderless"
            icon={<span className="icon-[jam--write-f]" />}
          >
            写作
          </Button>
          <Button
            theme="borderless"
            icon={<span className="icon-[line-md--list]" />}
          >
            思维导图
          </Button>
          <Button
            theme="borderless"
            icon={<span className="icon-[carbon--flow]" />}
          >
            流程图
          </Button>
        </div>
        <ChatInput onSend={(v) => {}}></ChatInput>
      </div>
    </div>
  );
};

export default observer(Conversation);
