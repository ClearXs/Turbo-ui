import useDataSourceApi, {
  DataSource,
  DataSourceApi,
} from '@/api/developer/datasource';
import { TableTreeSelectColumnProps } from '@/components/table-crud/components';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import _ from 'lodash';
import { DbStatus, getDbTypeTree } from './constant';

const DataSourceHelper: Helper<DataSource, DataSourceApi> = {
  getColumns: () => {
    return [
      {
        field: 'name',
        label: '数据源名称',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        field: 'key',
        label: '数据源key',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        field: 'address',
        label: '数据源连接地址',
        ellipsis: true,
        align: 'center',
        type: 'input',
        line: true,
        require: true,
      },
      {
        field: 'username',
        label: '连接用户名',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
        require: true,
      },
      {
        field: 'password',
        label: '连接密码',
        ellipsis: true,
        align: 'center',
        type: 'password',
        table: false,
        require: true,
      },
      {
        field: 'database',
        label: '数据库',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
        require: true,
      },
      {
        field: 'engine',
        label: '数据源引擎',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        require: true,
        table: true,
        filterTreeNode: true,
        expandAll: true,
        treeData: (tableContext) => {
          return getDbTypeTree();
        },
      } as TableTreeSelectColumnProps<DataSource>,
      {
        field: 'status',
        label: '状态',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: DbStatus,
        table: true,
        form: false,
      },
    ] as TableColumnProps<DataSource>[];
  },
  getApi: useDataSourceApi,
};
export default DataSourceHelper;
