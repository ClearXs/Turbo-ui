import TableCrud from '@/components/TableCrud';
import { DataSource } from '@/api/developer/datasource';
import DataSourceHelper from './helper';
import { Notification } from '@douyinfe/semi-ui';
import { directGetIcon } from '@/components/Icon';

const DataSource: React.FC = () => {
  const api = DataSourceHelper.getApi();

  return (
    <TableCrud<DataSource>
      mode="page"
      columns={DataSourceHelper.getColumns()}
      useApi={DataSourceHelper.getApi}
      modal={{
        append: [
          {
            code: 'test',
            name: '测试连接',
            type: 'primary',
            loading: true,
            icon: directGetIcon('IconTestScoreStroked'),
            onClick: (formContext) => {
              formContext.submit?.((values) => {
                formContext.loading = true;
                api
                  .testConnection(values)
                  .then((res) => {
                    const { code, data } = res;
                    if (code === 200 && data) {
                      Notification.success({ content: '连接成功' });
                    } else {
                      Notification.error({ content: '连接失败' });
                    }
                    formContext.loading = false;
                  })
                  .catch((err) => {
                    formContext.loading = false;
                  });
              });
            },
          },
        ],
      }}
      operateBar={{
        append: [
          {
            code: 'test',
            name: '测试连接',
            type: 'primary',
            icon: directGetIcon('IconTestScoreStroked'),
            onClick(tableContext, formContext, value) {
              api.testConnection(value).then((res) => {
                const { code, data } = res;
                if (code === 200 && data) {
                  Notification.success({ content: '连接成功' });
                } else {
                  Notification.error({ content: '连接失败' });
                }
              });
            },
          },
          {
            code: 'dataTable',
            name: '数据表',
            type: 'primary',
            icon: directGetIcon('IconVoteStroked'),
            onClick(tableContext, formContext, value) {
              api.showTables(value.id).then((res) => {
                Notification.info({ content: res.data });
              });
            },
          },
        ],
      }}
    />
  );
};

export default DataSource;
