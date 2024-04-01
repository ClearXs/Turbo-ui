import useMessageConfigApi, {
  MessageConfig,
  MessageConfigApi,
} from '@/api/message/config';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';
import { NotificationType } from '@/constant/notificationType';

const MessageConfigHelper: Helper<MessageConfig, MessageConfigApi> = {
  getColumns: () => {
    return [
      {
        label: '配置Key',
        field: 'key',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '配置名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '是否启用',
        field: 'enabled',
        ellipsis: true,
        align: 'center',
        type: 'switch',
      },
      {
        label: '发送方式',
        field: 'sendTemplates',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        form: true,
        line: true,
      },
      {
        label: '消息类型',
        field: 'messageType',
        ellipsis: true,
        align: 'center',
        type: 'select',
        dictionary: 'message_type',
      },
      {
        label: '通知类型',
        field: 'noticeType',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: NotificationType,
      },
      {
        label: '失败重试',
        field: 'retryFailed',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        form: true,
        line: true,
      },
      {
        label: '发送目标',
        field: 'sendTargets',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        form: true,
        line: true,
      },
    ] as TableColumnProps<MessageConfig>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useMessageConfigApi,
};

export default MessageConfigHelper;
