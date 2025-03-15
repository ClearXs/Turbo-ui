import {
  Button,
  Card,
  Col,
  Divider,
  Popover,
  Tag,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import React from 'react';
import ConversationContext from './conversation-context';
import { observer } from 'mobx-react';
import ChatInput from './components/ChatInput';
import IconButton from '@/components/button/IconButton';
import useChatApi from '@/api/ai/chat';
import WebsocketConversation from './components/WebsocketConversation';
import './conversation.scss';

export type ConversationProps = {
  context: ConversationContext;
};

const Conversation: React.FC<ConversationProps> = ({ context }) => {
  return (
    <div className="flex flex-col h-[100%] w-[100%] gap-2">
      <div className="flex flex-row gap-2 items-center">
        <Typography.Text size="small">
          {context?.conversation?.latestUserMessage}
        </Typography.Text>
        <Popover>
          <Tag>{context?.conversation?.modelOptions?.model}</Tag>
        </Popover>
        <Tag>{context?.agent}</Tag>
      </div>
      <Divider />
      {context.conversation == null ? (
        <ConversationHome context={context} />
      ) : (
        <WebsocketConversation conversation={context.conversation!} />
      )}
    </div>
  );
};

const ConversationHome: React.FC<ConversationProps> = observer(
  ({ context }) => {
    const chatApi = useChatApi();
    return (
      <>
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
        </div>
        <div className="w-[100%] mt-auto flex flex-col gap-2">
          <ChatInput
            onSend={({ text, options, modelOptions }) => {
              chatApi
                .newConversation({
                  agent: context.agent,
                  options,
                  modelOptions,
                })
                .then((res) => {
                  if (res.code === 200) {
                    context.setConversation({
                      ...res.data,
                      latestUserMessage: text,
                    });
                  }
                });
            }}
          ></ChatInput>
        </div>
      </>
    );
  },
);

export default observer(Conversation);
