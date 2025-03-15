import { Pagination } from '@/api';
import useChatApi, { Conversation } from '@/api/ai/chat';
import HotKeyButton from '@/components/button/HotKeyButton';
import HoverButton from '@/components/button/HoverButton';
import useOperatingSystem from '@/hook/useOperationSystem';
import {
  Button,
  Collapse,
  Divider,
  Dropdown,
  HotKeys,
  List,
  Spin,
  Typography,
} from '@douyinfe/semi-ui';
import { useCallback, useEffect, useState } from 'react';
import ConversationContext from './conversation-context';
import InfiniteScroll from 'react-infinite-scroll-component';
import { observer } from 'mobx-react';

const ConversationListPanel: React.FC<{ context: ConversationContext }> = ({
  context,
}) => {
  const chatApi = useChatApi();

  const [page, setPage] = useState<Pagination<Conversation>>({
    current: 1,
    size: 10,
  });
  const [chats, setChats] = useState<Conversation[]>([]);
  const [total, setTotal] = useState<number>(-1);

  const [selectChat, setSelectChat] = useState<string>();

  const os = useOperatingSystem();

  useEffect(() => {
    chatApi.mineConversation(page).then((res) => {
      if (res.code === 200) {
        setChats(res.data.records!);
        setTotal(res.data.total!);
      }
    });
  }, []);

  const getConversation = useCallback(() => {
    const newPage = {
      ...page,
      current: page.current === 1 ? page.current : page.current + 1,
    };
    chatApi.mineConversation(newPage).then((res) => {
      if (res.code === 200) {
        const data = res.data;
        setChats((prevChats) => [...prevChats, ...data.records!]);
        setPage(newPage);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 h-[100%]">
      <HotKeyButton
        hotKeys={
          os === 'macos'
            ? [HotKeys.Keys.Meta, HotKeys.Keys.K]
            : [HotKeys.Keys.Control, HotKeys.Keys.K]
        }
        icon={<span className="icon-[nimbus--edit] w-4 h-4"></span>}
        onHotKey={(e) => {
          context.setConversation(undefined);
        }}
        onClick={() => {
          context.setConversation(undefined);
        }}
      >
        <Typography.Text>新建会话</Typography.Text>
      </HotKeyButton>
      <Divider />
      <Collapse
        accordion
        defaultActiveKey="recentConversation"
        clickHeaderToExpand
      >
        <Collapse.Panel header="最近对话" itemKey="recentConversation">
          <InfiniteScroll
            next={getConversation}
            loader={
              <div className="flex w-[100%] items-center">
                <Spin />
              </div>
            }
            hasMore={chats.length < total || total === -1}
            height="28rem"
            dataLength={chats.length}
          >
            <List
              dataSource={chats}
              renderItem={(conversation) => (
                <List.Item>
                  <ConversationItem
                    conversation={conversation}
                    isSelect={conversation.id === selectChat}
                    context={context}
                  />
                </List.Item>
              )}
            ></List>
          </InfiniteScroll>
        </Collapse.Panel>
      </Collapse>

      <Button
        block
        className="mt-auto"
        icon={<span className="icon-[tdesign--control-platform-filled]" />}
      >
        管理对话记录
      </Button>
    </div>
  );
};

const ConversationItem: React.FC<{
  conversation: Conversation;
  isSelect: boolean;
  context: ConversationContext;
}> = observer(({ conversation, isSelect, context }) => {
  return (
    <HoverButton
      className="always-show-hover-child"
      onClick={(e) => {
        e.stopPropagation();
        context.setConversation(conversation);
      }}
      hover={
        <Dropdown
          trigger="hover"
          render={
            <Dropdown.Menu>
              <Dropdown.Item icon={<span className="icon-[mdi--rename]" />}>
                重命名
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                type="danger"
                icon={<span className="icon-[material-symbols--delete]" />}
              >
                删除
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <span className="icon-[ion--more] ml-auto"></span>
        </Dropdown>
      }
    >
      <Typography.Text ellipsis>
        {conversation.latestUserMessage ?? '新对话'}
      </Typography.Text>
    </HoverButton>
  );
});

export default observer(ConversationListPanel);
