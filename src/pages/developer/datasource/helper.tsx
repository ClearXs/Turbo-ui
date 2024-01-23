import { DataSource } from '@/api/developer/datasource';
import {
  TableColumnProps,
  TableTreeSelectColumnProps,
} from '@/components/TableCrud/interface';
import { Constant } from '@/constant';
import { Helper } from '@/pages/interface';
import { Space, Tag } from '@douyinfe/semi-ui';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import _ from 'lodash';

type EngineCategory =
  | 'relational'
  | 'key value'
  | 'document'
  | 'time series'
  | 'search engine'
  | 'graph'
  | 'object oriented'
  | 'vector';

export const DBCategory: Constant<EngineCategory>[] = [
  {
    value: 'relational',
    label: '关系型数据库',
    tag: 'amber',
  },
  {
    value: 'key value',
    label: '键值对数据库',
    tag: 'blue',
  },
  {
    value: 'document',
    label: '文档数据库',
    tag: 'cyan',
  },
  {
    value: 'time series',
    label: '时序数据库',
    tag: 'green',
  },
  {
    value: 'graph',
    label: '图数据库',
    tag: 'grey',
  },
  {
    value: 'search engine',
    label: '搜索引擎',
    tag: 'indigo',
  },
  {
    value: 'object oriented',
    label: '面对对象数据库',
    tag: 'light-blue',
  },
  {
    value: 'vector',
    label: '向量数据库',
    tag: 'yellow',
  },
];

export const DBType: (Constant & {
  category: EngineCategory;
})[] = [
  {
    value: 'MySQL',
    label: 'MySQL',
    extra: '',
    category: 'relational',
  },
  {
    value: 'PostgreSQL',
    label: 'PostgreSQL',
    category: 'relational',
  },
  {
    value: 'SQLServer',
    label: 'SQLServer',
    category: 'relational',
  },
  {
    value: 'Oracle',
    label: 'Oracle',
    category: 'relational',
  },
  {
    value: 'OpenGauss',
    label: 'OpenGauss',
    category: 'relational',
  },
  {
    value: 'Db2',
    label: 'Db2',
    category: 'relational',
  },
  {
    value: 'MariaDB',
    label: 'MariaDB',
    category: 'relational',
  },
  {
    value: 'SQLite',
    label: 'SQLite',
    category: 'relational',
  },
  {
    value: 'H2',
    label: 'H2',
    category: 'relational',
  },
  {
    value: 'ElasticSearch',
    label: 'ElasticSearch',
    category: 'search engine',
  },
  {
    value: 'Mongodb',
    label: 'Mongodb',
    category: 'document',
  },
  {
    value: 'TDEngine',
    label: 'TDEngine',
    category: 'time series',
  },
  {
    value: 'Influxdb',
    label: 'Influxdb',
    category: 'time series',
  },
  {
    value: 'Neo4j',
    label: 'Neo4j',
    category: 'graph',
  },
  {
    value: 'Redis',
    label: 'Redis',
    category: 'key value',
  },
];

const getDbTypeTree = (): TreeNodeData[] => {
  const group = _.groupBy(DBType, (d) => d.category);
  const treeNode: TreeNodeData[] = [];
  const labelRender = (constant: Constant) => {
    return (
      <Space>
        {constant.tag ? (
          <Tag color={constant.tag}>{constant.label}</Tag>
        ) : (
          <Text>{constant.label}</Text>
        )}
      </Space>
    );
  };

  for (const key in group) {
    const category = DBCategory.find((kind) => kind.value === key) as Constant;
    const children = group[key];
    treeNode.push({
      key: category?.value,
      value: category?.value,
      label: labelRender(category),
      disabled: true,
      children: children.map((chi) => {
        return {
          key: chi?.value,
          value: chi?.value,
          label: labelRender(chi),
        };
      }),
    });
  }
  return treeNode;
};

const DataSourceHelper: Helper<DataSource> = {
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
        field: 'url',
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
      },
      {
        field: 'password',
        label: '连接密码',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
      },
      {
        field: 'engine',
        label: '数据源引擎',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        table: true,
        filterTreeNode: true,
        expandAll: true,
        treeData: (tableContext) => {
          return getDbTypeTree();
        },
      } as TableTreeSelectColumnProps<DataSource>,
    ] as TableColumnProps<DataSource>[];
  },
};
export default DataSourceHelper;
