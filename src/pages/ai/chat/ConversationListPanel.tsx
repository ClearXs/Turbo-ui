import { Pagination } from '@/api';
import useChatApi, { Conversation } from '@/api/ai/chat';
import HotKeyButton from '@/components/button/HotKeyButton';
import HoverButton from '@/components/button/HoverButton';
import useOperatingSystem from '@/hook/useOperationSystem';
import {
  Divider,
  Dropdown,
  HotKeys,
  List,
  Spin,
  Typography,
} from '@douyinfe/semi-ui';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ConversationContext from './conversation-context';
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
  const [hasMore, setHasMore] = useState<boolean>(true);

  const os = useOperatingSystem();

  const getConversation = (pageNo: number) => {
    const newPage = { ...page, current: pageNo };
    chatApi.mineConversation(newPage).then((res) => {
      if (res.code === 200) {
        const newChats = [...chats, ...res.data.records!];
        setChats(newChats);
        setPage(newPage);

        const total = res.data.total!;
        if (newChats.length >= total) {
          setHasMore(false);
        }
      }
    });
  };

  return (
    <div className="max-h-[100%] w-[100%] overflow-y-auto">
      <div
        onClick={() => {
          chatApi.newConversation().then((res) => {
            if (res.code === 200) {
              getConversation(page.current);
            }
          });
        }}
      >
        <HotKeyButton
          hotKeys={
            os === 'macos'
              ? [HotKeys.Keys.Meta, HotKeys.Keys.K]
              : [HotKeys.Keys.Control, HotKeys.Keys.K]
          }
          icon={<span className="icon-[nimbus--edit] w-4 h-4"></span>}
          onHotKey={(e) => {
            console.log(e);
          }}
        >
          <Typography.Text>新建会话</Typography.Text>
        </HotKeyButton>
      </div>
      <Divider />
      <InfiniteScroll
        loadMore={getConversation}
        loader={<Spin />}
        hasMore={hasMore}
        pageStart={0}
      >
        <List
          dataSource={chats}
          renderItem={(item) => (
            <List.Item>
              <ConversationItem {...item} />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};

const ConversationItem: React.FC<Conversation> = (conversation) => {
  return (
    <HoverButton
      hover={
        <Dropdown
          trigger="click"
          render={
            <Dropdown.Menu>
              <Dropdown.Item>Menu Item 1</Dropdown.Item>
              <Dropdown.Item>Menu Item 2</Dropdown.Item>
              <Dropdown.Item>Menu Item 3</Dropdown.Item>
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
};

export default observer(ConversationListPanel);
