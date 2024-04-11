import { Pagination } from '@/api';
import useMessageApi, { Message } from '@/api/message/message';
import { Dic } from '@/api/system/dic';
import {
  Button,
  List,
  Spin,
  Typography,
  Avatar,
  Divider,
  Space,
  Tooltip,
  Toast,
} from '@douyinfe/semi-ui';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';
import { IconAllRead } from '../Icon/collection/IconAllRead';
import { IconLookupAll } from '../Icon/collection/IconLookupAll';
import { IconMarkRead } from '../Icon/collection/IconMarkRead';
import { findConstant } from '@/constant/util';
import { MessageSource } from '@/constant/messageSource';
import ConstantTag from '../Tag/ConstantTag';

export type IMessageProps = {
  messageTypes: Dic[];
  onReload?: () => void;
};

const initialPagination: Pagination<Message> = {
  current: '1',
  size: '5',
};

const MessageScrolling: React.FC<IMessageProps> = ({
  messageTypes,
  onReload,
}) => {
  const messageApi = useMessageApi();
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] =
    useState<Pagination<Message>>(initialPagination);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const navigation = useNavigate();
  const maxThreshold = 15;

  const getMessageType = (messageTypeKey: string) => {
    return messageTypes.find((m) => m.code === messageTypeKey);
  };

  const loadMessage = (pagination: Pagination<Message>, append?: boolean) => {
    if (append) {
      setLoadMoreLoading(true);
    } else {
      setLoading(true);
    }
    messageApi
      .currentUserMessage(pagination, {
        orders: [{ property: 'messageStatus', direction: 'ASC' }],
      })
      .then((res) => {
        const { code, data } = res;
        if (code === 200) {
          const records = data.records || [];
          if (append === true) {
            const total = [...messages, ...records];
            if (total.length > maxThreshold) {
              setLoadMore(false);
            }
            setMessages(total);
          } else {
            if (records.length < Number(initialPagination.size)) {
              setLoadMore(false);
            }
            setMessages(records);
          }
        }
        if (loading === true) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    loadMessage(pagination);
  }, []);

  return (
    <div className="w-96 h-96 border-r-2">
      <Spin spinning={loading}>
        <div className="h-[10%] m-3 flex">
          <Typography.Title heading={6}>Notification</Typography.Title>
          <Space className="ml-auto" spacing={10}>
            <Tooltip content="全部已读">
              <Button
                type="primary"
                icon={<IconAllRead />}
                onClick={() => {
                  const ids = messages.map((m) => m.id);
                  setLoading(true);
                  messageApi
                    .read(ids)
                    .then((res) => {
                      const { code, data, message } = res;
                      if (code === 200 && data) {
                        // reset message
                        setPagination(initialPagination);
                        loadMessage(initialPagination);
                        // load parent component, make can be load relevant content, like as unread count
                        onReload?.();
                      } else {
                        Toast.error(message);
                      }
                      setLoading(false);
                    })
                    .catch((err) => {
                      setLoading(false);
                    });
                }}
              />
            </Tooltip>
            <Tooltip content="查看所有">
              <Button
                type="primary"
                icon={<IconLookupAll />}
                onClick={() => {
                  navigation('/profile');
                }}
              />
            </Tooltip>
          </Space>
        </div>
        <Divider />
        <div className="h-[80%] max-h-[19rem] overflow-y-auto">
          <InfiniteScroll
            initialLoad={false}
            pageStart={Number(initialPagination.current)}
            hasMore={loadMore && !loadMoreLoading}
            loadMore={() => {
              const newPagination: Pagination<Message> = {
                ...pagination,
                current: (Number(pagination.current) + 1).toString(),
              };
              setPagination(newPagination);
              loadMessage(newPagination, true);
            }}
            useWindow={false}
          >
            <List
              loadMore={loadMore && !loadMoreLoading}
              dataSource={messages}
              renderItem={(message) => {
                const {
                  id,
                  title,
                  subtitle,
                  sendTime,
                  content,
                  messageType,
                  messageStatus,
                  messageSource,
                  pcUrl,
                } = message;
                const messageTypeEntity = getMessageType(messageType);
                const messageSourceConstant = findConstant(
                  messageSource,
                  MessageSource,
                );
                const unreadStyles: React.CSSProperties =
                  messageStatus === 'UNREAD'
                    ? { backgroundColor: 'rgba(var(--semi-grey-0), 1)' }
                    : { backgroundColor: 'rgba(var(--semi-green-0), 1)' };
                return (
                  <List.Item
                    style={unreadStyles}
                    header={
                      <Avatar
                        color={messageTypeEntity?.color || 'blue'}
                        size="medium"
                      >
                        {messageTypeEntity?.name}
                      </Avatar>
                    }
                    main={
                      <div
                        className="cursor-pointer gap-1 flex flex-col"
                        onClick={() => {
                          if (!_.isEmpty(pcUrl)) {
                            navigation(pcUrl);
                          }
                        }}
                      >
                        <div className="flex">
                          <Typography.Text strong>{title}</Typography.Text>
                          <Typography.Text type="secondary" className="ml-auto">
                            {subtitle}
                          </Typography.Text>
                          {messageSourceConstant && (
                            <div className="ml-auto">
                              <ConstantTag
                                constant={messageSourceConstant}
                                shape="circle"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex">
                          <Typography.Text
                            type="secondary"
                            size="small"
                            className="ml-auto"
                          >
                            {sendTime}
                          </Typography.Text>
                        </div>
                        <div className="flex">
                          <Typography.Paragraph
                            ellipsis={{ showTooltip: true }}
                          >
                            {content}
                          </Typography.Paragraph>
                          <div className="ml-auto">
                            <Tooltip content="标记为已读">
                              <Button
                                type="primary"
                                icon={<IconMarkRead />}
                                onClick={() => {
                                  setLoading(true);
                                  messageApi
                                    .read([id])
                                    .then((res) => {
                                      const { code, data, message } = res;
                                      if (code === 200 && data) {
                                        // reset message
                                        setPagination(initialPagination);
                                        loadMessage(initialPagination);
                                        // load parent component, make can be load relevant content, like as unread count
                                        onReload?.();
                                      } else {
                                        Toast.error(message);
                                      }
                                      setLoading(false);
                                    })
                                    .catch((err) => {
                                      setLoading(false);
                                    });
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    }
                  />
                );
              }}
            />
            <Spin
              spinning={loadMoreLoading && loadMore}
              style={{ textAlign: 'center', width: '100%' }}
            />
          </InfiniteScroll>
        </div>
        <div className="h-[10%]">
          <Button
            block
            theme="borderless"
            onClick={() => {
              navigation('/profile');
            }}
          >
            查看所有
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default MessageScrolling;
