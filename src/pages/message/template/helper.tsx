import useMessageTemplateApi, {
  MessageTemplate,
  MessageTemplateApi,
} from '@/api/message/template';
import { FormJsonObjectColumnProps } from '@/components/tform/components';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import _ from 'lodash';

const MessageTemplateHelper: Helper<MessageTemplate, MessageTemplateApi> = {
  getColumns: () => {
    return [
      {
        label: '模板Key',
        field: 'key',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '模板名称',
        field: 'name',
        ellipsis: true,
        search: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '消息标题',
        field: 'title',
        ellipsis: true,
        align: 'center',
        type: 'input',
        line: true,
      },
      {
        label: '消息副标题',
        field: 'subtitle',
        ellipsis: true,
        align: 'center',
        type: 'input',
        line: true,
      },
      {
        label: '模板内容',
        field: 'template',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        line: true,
      },
      {
        label: '模板变量',
        field: 'variables',
        ellipsis: true,
        align: 'center',
        type: 'jsonArray',
        form: true,
        line: true,
        columns: [
          {
            label: '变量Key',
            field: 'key',
            ellipsis: true,
            align: 'center',
            type: 'input',
          },
          {
            label: '描述',
            field: 'des',
            ellipsis: true,
            align: 'center',
            type: 'input',
          },
          {
            label: '默认值',
            field: 'defaultValue',
            ellipsis: true,
            align: 'center',
            type: 'input',
          },
        ],
      } as FormJsonObjectColumnProps<any>,
      {
        label: '拓展配置',
        field: 'extension',
        ellipsis: true,
        align: 'center',
        type: 'jsonObject',
        line: true,
        columns: [
          {
            label: 'pcUrl',
            field: 'pcUrl',
            align: 'center',
            type: 'number',
          },
          {
            label: 'appUrl',
            field: 'appUrl',
            align: 'center',
            type: 'number',
          },
        ],
      } as FormJsonObjectColumnProps<any>,
    ] as TableColumnProps<MessageTemplate>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useMessageTemplateApi,
};

export default MessageTemplateHelper;
