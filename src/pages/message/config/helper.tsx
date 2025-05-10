import useMessageConfigApi, {
  MessageConfig,
  MessageConfigApi,
} from '@/api/message/config';
import { FormJsonObjectColumnProps } from '@/components/uni-form/components';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import { NotificationType } from '@/constant/notification-type';
import { RetryStrategy } from '@/constant/retry-strategy';
import { SendProtocol } from '@/constant/send-protocol';
import { SendTarget } from '@/constant/send-target';
import { SendWay } from '@/constant/send-way';
import _ from 'lodash';

const MessageConfigHelper: Helper<MessageConfig, MessageConfigApi> = {
  getColumns: () => {
    return [
      {
        label: '配置Key',
        field: 'key',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '配置名称',
        field: 'name',
        ellipsis: true,
        search: true,
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
        initValue: true,
      },
      {
        label: '发送方式',
        field: 'sendTemplates',
        ellipsis: true,
        align: 'center',
        type: 'jsonObject',
        form: true,
        line: true,
        initValue: [{ sendWay: 'SYSTEM' }],
        columns: [
          {
            label: '发送方式',
            field: 'sendWay',
            align: 'center',
            type: 'select',
            optionList: SendWay,
            initValue: 'SYSTEM',
            reaction: {
              target: 'sendKey',
              fulfill: {
                state: {
                  'x-visible': '{{$self.value !== "SYSTEM"}}',
                },
              },
            },
          },
          {
            label: '发送标识',
            field: 'sendKey',
            align: 'center',
            type: 'input',
          },
          {
            label: '消息推送方式',
            field: 'protocols',
            align: 'center',
            type: 'select',
            multiple: true,
            optionList: SendProtocol,
          },
        ],
      } as FormJsonObjectColumnProps<any>,
      {
        label: '消息类型',
        field: 'messageType',
        ellipsis: true,
        align: 'center',
        type: 'select',
        dictionary: 'message_type',
        require: true,
      },
      {
        label: '通知类型',
        field: 'noticeType',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: NotificationType,
        initValue: 'Remind',
      },
      {
        label: '失败重试',
        field: 'retryFailed',
        ellipsis: true,
        align: 'center',
        type: 'jsonObject',
        line: true,
        columns: [
          {
            label: '消息重试策略',
            field: 'strategy',
            align: 'center',
            type: 'select',
            optionList: RetryStrategy,
            initValue: 'IGNORE',
            reaction: {
              target: '*(count,timeout)',
              fulfill: {
                state: {
                  'x-visible': '{{$self.value !== "IGNORE"}}',
                },
              },
            },
          },
          {
            label: '重试次数',
            field: 'count',
            align: 'center',
            type: 'number',
          },
          {
            label: '延迟时间',
            field: 'timeout',
            align: 'center',
            type: 'number',
          },
        ],
      } as FormJsonObjectColumnProps<any>,
      {
        label: '发送目标',
        field: 'sendTargets',
        ellipsis: true,
        align: 'center',
        type: 'jsonArray',
        columns: [
          {
            label: '用户类型',
            field: 'target',
            type: 'select',
            optionList: SendTarget,
          },
          {
            label: '标识',
            field: 'key',
            type: 'input',
          },
        ],
        line: true,
      } as FormJsonObjectColumnProps<any>,
      {
        label: '默认消息模板',
        field: 'defaultTemplateIds',
        align: 'center',
        type: 'select',
        remote: {
          url: '/api/sys/message/template/list',
        },
        multiple: true,
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
