import { Bo } from '@/api/developer/bo';
import { BoAttributeTree } from '@/api/developer/boattribute';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';
import { BoAttributeTypes } from './boattributetype';
import { toTreeNode } from '@/components/Tag/ConstantTag';

const BoHelper: Helper<Bo> = {
  getColumns: () => {
    return [
      {
        label: '业务对象名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '业务对象编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '数据源',
        field: 'dataSourceId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        remote: {
          url: '/api/dev/datasource/list',
        },
      },
      {
        label: '备注',
        field: 'remark',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        table: false,
        line: true,
      },
    ] as TableColumnProps<Bo>[];
  },
};

const BoTableHelper: Helper<BoAttributeTree> = {
  getColumns: () => {
    return [
      {
        label: '表名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '表编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '表字段',
        field: 'field',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '所属于业务对象ID',
        field: 'boId',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
        form: false,
      },
    ] as TableColumnProps<BoAttributeTree>[];
  },
};

const BoAttributeHelper: Helper<BoAttributeTree> = {
  getColumns: () => {
    return [
      {
        label: '属性名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '属性编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '属性字段',
        field: 'field',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '属性类型',
        field: 'type',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        require: true,
        table: true,
        filterTreeNode: true,
        expandAll: true,
        treeData: () => {
          return toTreeNode(BoAttributeTypes);
        },
      } as TableTreeSelectColumnProps<BoAttributeTree>,
      {
        label: '属性长度',
        field: 'precision',
        ellipsis: true,
        align: 'center',
        type: 'number',
        table: false,
      },
      {
        label: '小数位',
        field: 'scala',
        ellipsis: true,
        align: 'center',
        type: 'number',
        table: false,
      },
      {
        label: '是否主键',
        field: 'isPk',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: true,
      },
      {
        label: '是否外键',
        field: 'isFk',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否非空',
        field: 'isNonNull',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否唯一',
        field: 'isUnique',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '属性备注',
        field: 'remark',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        line: true,
        table: false,
      },
      {
        label: '所属于业务对象boID',
        field: 'boId',
        ellipsis: true,
        align: 'center',
        type: 'input',
        form: false,
        table: false,
      },
    ] as TableColumnProps<BoAttributeTree>[];
  },
};

export { BoTableHelper, BoAttributeHelper };

export default BoHelper;
