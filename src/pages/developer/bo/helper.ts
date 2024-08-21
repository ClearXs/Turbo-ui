import useBoApi, { Bo, BoApi } from '@/api/developer/bo';
import useBoAttributeApi, {
  BoAttributeApi,
  BoAttributeTree,
} from '@/api/developer/boattribute';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import BO_ATTRIBUTE_TREE from './boattributetype';
import { toTreeNode } from '@/components/tag/ConstantTag';
import {
  TableSelectColumnProps,
  TableTreeSelectColumnProps,
} from '@/components/table-crud/components';
import DataSourceHelper from '../datasource/helper';
import useReaction from '@/components/tform/formily/reaction';

const BoHelper: Helper<Bo, BoApi> = {
  getColumns: () => {
    const reaction = useReaction();
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
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '数据源',
        field: 'dataSourceId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        remote: {
          url: '/api/dev/datasource/list',
        },
        showClear: true,
        relation: {
          helper: DataSourceHelper,
        },
      } as TableSelectColumnProps<Bo>,
      {
        label: '是否物化',
        field: 'materialize',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        form: false,
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
  getApi: useBoApi,
};

const BoTableHelper: Helper<BoAttributeTree, BoAttributeApi> = {
  getColumns: () => {
    const reaction = useReaction();
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
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '表字段',
        field: 'field',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        extraText: '对应于数据库表，建议采用snake命名法',
        reaction: reaction.setWord('field', ['code'], 'snake'),
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
  getApi: useBoAttributeApi,
};

const BoAttributeHelper: Helper<BoAttributeTree, BoAttributeApi> = {
  getColumns: () => {
    const reaction = useReaction();
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
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '属性字段',
        field: 'field',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        extraText: '对应于数据库字段，建议采用snake命名法',
        reaction: reaction.setWord('field', ['code'], 'snake'),
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
        initValue: 'varchar',
        treeData: () => {
          return toTreeNode(BO_ATTRIBUTE_TREE.getTreeData());
        },
      } as TableTreeSelectColumnProps<BoAttributeTree>,
      {
        label: '属性长度',
        field: 'precision',
        ellipsis: true,
        align: 'center',
        type: 'number',
        table: false,
        reaction: reaction.withRun({
          target: 'type',
          fulfill: ($self, $target) => {
            const typeValue = $target?.value;
            const attribute = BO_ATTRIBUTE_TREE.findTree(typeValue);
            if (attribute?.precision) {
              $self.setDisplay('visible');
              $self.setValue(attribute.precision);
            } else {
              $self.setDisplay('hidden');
            }
          },
        }),
      },
      {
        label: '小数位',
        field: 'scala',
        ellipsis: true,
        align: 'center',
        type: 'number',
        table: false,
        max: 5,
        reaction: reaction.withRun({
          target: 'type',
          fulfill: ($self, $target) => {
            const typeValue = $target?.value;
            const attribute = BO_ATTRIBUTE_TREE.findTree(typeValue);
            if (attribute?.scale) {
              $self.setDisplay('visible');
              $self.setValue(attribute.scale);
            } else {
              $self.setDisplay('hidden');
            }
          },
        }),
      },
      {
        label: '是否主键',
        field: 'pk',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: true,
      },
      {
        label: '是否外键',
        field: 'fk',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否非空',
        field: 'nonNull',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否唯一',
        field: 'unique',
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
        label: '是否默认字段',
        field: 'defaulted',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        line: true,
        form: false,
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
  getApi: useBoAttributeApi,
};

export { BoTableHelper, BoAttributeHelper };

export default BoHelper;
