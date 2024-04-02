import { Pagination } from '@/api';
import useMessageApi, { Message } from '@/api/message/message';
import { Dic } from '@/api/system/dic';
import { Button, TabPane, Tabs } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useState } from 'react';

export type IMessageProps = {
  messageType: Dic[];
};

const MessageScrolling: React.FC<IMessageProps> = (props) => {
  const messageApi = useMessageApi();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMessageType, setActiveMessageType] = useState<string>();
  const [pagination, setPagination] = useState<Pagination<Message>>({
    current: '1',
    size: '5',
  });

  const { messageType } = props;

  const loadMessage = useCallback((messageType: string) => {
    messageApi
      .currentUser(pagination, {
        entity: { messageType: messageType, messageStatus: 'UNREAD' },
      })
      .then((res) => {
        const { code, data } = res;
        if (code === 200) {
          const messages = data.records || [];
          setMessages(messages);
        }
      });
  }, []);

  useEffect(() => {
    if (messageType.length > 0) {
      const activeMessageType = messageType[0].code;
      loadMessage(activeMessageType);
      setActiveMessageType(activeMessageType);
    }
  }, []);

  return (
    <div className="w-96 h-80 max-h-80 overflow-y-auto border-r-2">
      <div className="w-[100%] h-[90%]">
        <Tabs
          type="button"
          size="small"
          activeKey={activeMessageType}
          onTabClick={(tabKey) => {
            loadMessage(tabKey);
            setActiveMessageType(tabKey);
          }}
        >
          {messageType.map((type) => {
            return (
              <TabPane tab={type.name} itemKey={type.code}>
                {type.name}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
      <div className="w-[100%] h-[10%]">
        <Button block theme="borderless" type="tertiary">
          查看更多
        </Button>
      </div>
    </div>
  );
};

export default MessageScrolling;
