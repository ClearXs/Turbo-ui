import TableCrud from '@/components/table-crud';
import { Sequence } from '@/api/developer/sequence';
import SequenceHelper from './helper';
import { directGetIcon } from '@/components/icon/shared';
import App from '@/components/app';
import { Toast, Typography } from '@douyinfe/semi-ui';

const SequencePage = () => {
  const sequenceApi = SequenceHelper.getApi();
  const { modular } = App.useApp();

  return (
    <TableCrud<Sequence>
      mode="page"
      columns={SequenceHelper.getColumns()}
      useApi={sequenceApi}
      operateBar={{
        append: [
          {
            code: 'reset',
            name: '重置',
            icon: directGetIcon('IconSync'),
            type: 'primary',
            onClick(tableContext, formContext, value) {
              const instance = modular.warning({
                size: 'small',
                content: '该操作将会把序号值重置为初始值',
                onConfirm() {
                  sequenceApi.rest(value.id).then((res) => {
                    const { code, message } = res;
                    if (code === 200) {
                      Toast.success(message);
                      instance.destroy();
                    }
                  });
                },
              });
            },
          },
          {
            code: 'generate',
            name: '预览',
            icon: directGetIcon('IconIdentity'),
            type: 'primary',
            onClick(tableContext, formContext, value) {
              sequenceApi.generateList(value.id, 5).then((res) => {
                const { code, data } = res;
                if (code === 200) {
                  modular.info({
                    size: 'small',
                    content: (
                      <div className="flex flex-col gap-2 ">
                        {data.map((autoNumber) => {
                          return (
                            <Typography.Text copyable>
                              {autoNumber}
                            </Typography.Text>
                          );
                        })}
                      </div>
                    ),
                    showConfirm: false,
                    showCancel: false,
                  });
                }
              });
            },
          },
        ],
      }}
    />
  );
};

export default SequencePage;
