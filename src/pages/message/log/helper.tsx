import useMessageLogApi, { MessageLog, MessageLogApi } from '@/api/message/log';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import { SendStatus } from '@/constant/send-status';
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
        showClear: true,
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
        search: true,
        showClear: true,
      },
      {
        label: '发送状态',
        field: 'sendStatus',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: SendStatus,
      },
      {
        label: '运行时变量',
        field: 'variables',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
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
