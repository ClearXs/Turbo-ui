import { Pagination } from '@/api';
import useMessageApi, { Message } from '@/api/message/message';
import { Dic } from '@/api/system/dic';
import {
  Button,
  Empty,
  List,
  Spin,
  TabPane,
  Tabs,
  Typography,
  Avatar,
} from '@douyinfe/semi-ui';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';

export type IMessageProps = {
  messageTypes: Dic[];
};

const initialPagination: Pagination<Message> = {
  current: '1',
  size: '5',
};

const MessageScrolling: React.FC<IMessageProps> = ({ messageTypes }) => {
  const messageApi = useMessageApi();
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] =
    useState<Pagination<Message>>(initialPagination);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const navigation = useNavigate();

  const getMessageType = useCallback((messageTypeKey: string) => {
    return messageTypes.find((m) => m.code === messageTypeKey);
  }, []);

  const loadMessage = useCallback((pagination: Pagination<Message>) => {
    messageApi
      .currentUser(pagination, {
        entity: { messageStatus: 'UNREAD' },
      })
      .then((res) => {
        const { code, data } = res;
        if (code === 200) {
          const messages = data.records || [];
          setMessages(messages);
        }
        if (loading === true) {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    loadMessage(pagination);
  }, []);

  return (
    <div className="w-96 h-80 max-h-80 overflow-y-auto border-r-2">
      <Spin spinning={loading}>
        <div className="w-[100%] h-[90%]">
          <Tabs type="button" size="small">
            <TabPane tab="Notification" itemKey="Notification">
              <InfiniteScroll
                pageStart={Number(initialPagination.current)}
                threshold={Number(initialPagination.size)}
                loadMore={() => {
                  const newPagination: Pagination<Message> = {
                    ...pagination,
                    current: (Number(pagination) + 1).toString(),
                  };
                  setPagination(newPagination);
                  loadMessage(newPagination);
                }}
              >
                <List
                  dataSource={messages}
                  renderItem={(item) => {
                    const messageType = getMessageType(item.configKey);
                    return (
                      <List.Item
                        header={
                          <Avatar color={messageType?.color}>
                            {messageType?.name}
                          </Avatar>
                        }
                        main={
                          <div className="cursor-pointer">
                            <div>
                              <Typography.Text>{item.title}</Typography.Text>
                              <Typography.Text>{item.subtitle}</Typography.Text>
                            </div>
                            <div>
                              <Typography.Paragraph
                                ellipsis={{ showTooltip: true }}
                              >
                                {item.content}
                              </Typography.Paragraph>
                            </div>
                          </div>
                        }
                      />
                    );
                  }}
                />
              </InfiniteScroll>
            </TabPane>
          </Tabs>
        </div>
        <div className="w-[100%] h-[10%]">
          <Button block theme="borderless" type="tertiary">
            查看更多
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default MessageScrolling;
