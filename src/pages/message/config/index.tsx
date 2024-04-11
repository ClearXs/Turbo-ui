import TableCrud from '@/components/TableCrud';
import { MessageConfig } from '@/api/message/config';
import MessageConfigHelper from './helper';
import { IconSender } from '@/components/Icon/collection/IconSender';
import TForm from '@/components/TForm/TForm';
import { FormJsonObjectColumnProps } from '@/components/TForm/components';
import { Toast } from '@douyinfe/semi-ui';
import useMessageApi from '@/api/message/message';

const MessageConfigComponent = () => {
  const messageApi = useMessageApi();
  return (
    <TableCrud<MessageConfig>
      mode="page"
      useApi={MessageConfigHelper.getApi}
      columns={MessageConfigHelper.getColumns()}
      toolbar={{
        append: [
          {
            code: 'publish',
            name: '消息发送',
            type: 'primary',
            position: 'left',
            icon: <IconSender />,
            onClick(tableContext, formContext) {
              const selectedRows = tableContext.getSelectedRows();
              if (
                selectedRows === undefined ||
                selectedRows.length <= 0 ||
                selectedRows.length > 1
              ) {
                Toast.error('请选择一条配置信息');
                return;
              }
              const messageConfig = selectedRows[0];
              const form = TForm.open({
                mode: 'simply',
                title: '消息发送',
                columns: [
                  {
                    label: '消息标题',
                    field: 'title',
                    ellipsis: true,
                    align: 'center',
                    type: 'input',
                    line: true,
                    require: true,
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
                ],
                onOk: (formContext) => {
                  const values = formContext.getValues();
                  messageApi
                    .publish(messageConfig.key, values)
                    .then(() => {
                      form.destroy();
                    })
                    .catch((err) => {
                      form.destroy();
                    });
                },
              });
            },
          },
        ],
      }}
    />
  );
};

export default MessageConfigComponent;
