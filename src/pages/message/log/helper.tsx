import useMessageLogApi, { MessageLog, MessageLogApi } from '@/api/message/log';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';
import { SendStatus } from '@/constant/sendStatus';
import _ from 'lodash';

const MessageLogHelper: Helper<MessageLog, MessageLogApi> = {
  getColumns: () => {
    return [
      {
        label: '发送人',
        field: 'sendUser',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'user',
      },
      {
        label: '发送时间',
        field: 'sendTime',
        ellipsis: true,
        align: 'center',
        type: 'date',
        search: true,
      },
      {
        label: '接收人',
        field: 'receiver',
        ellipsis: true,
        align: 'center',
        type: 'user',
      },
      {
        label: '运行时消息变量',
        field: 'sendStatus',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: SendStatus,
      },
    ] as TableColumnProps<MessageLog>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useMessageLogApi,
};

export default MessageLogHelper;
