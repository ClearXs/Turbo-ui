import TableCrud from '@/components/TableCrud';
import { DataSource as DataSourceEntity } from '@/api/developer/datasource';
import DataSourceHelper from './helper';
import { Notification } from '@douyinfe/semi-ui';
import { tryGetIcon } from '@/components/Icon';
import TableGrid from './TableGrid';
import App from '@/components/App';

const DataSource: React.FC = () => {
  const api = DataSourceHelper.getApi();
  const { modular } = App.useApp();

  return (
    <TableCrud<DataSourceEntity>
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
            icon: tryGetIcon('IconTestScoreStroked'),
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
            icon: tryGetIcon('IconTestScoreStroked'),
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
            icon: tryGetIcon('IconVoteStroked'),
            onClick(tableContext, formContext, value) {
              modular.show({
                title: value.name,
                content: <TableGrid dataSourceId={value.id} />,
                size: 'full-width',
                showConfirm: false,
                showCancel: false,
              });
            },
          },
        ],
      }}
    />
  );
};

export default DataSource;
