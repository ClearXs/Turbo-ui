import { Org } from '@/api/system/org';
import { TableTreeSelectColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';
import { treeMap } from '@/util/tree';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

const OrgHelper: Helper<Org> = {
  getColumns: () => {
    return [
      {
        label: '名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '编码',
        field: 'code',
        type: 'input',
        ellipsis: true,
        align: 'center',
        require: true,
        extraText: '编码需要唯一',
      },

      {
        label: '类型',
        field: 'type',
        ellipsis: true,
        type: 'select',
        align: 'center',
        require: true,
        search: true,
        dic: 'org',
      },
      {
        label: '上级菜单',
        field: 'parentId',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        table: false,
        filterTreeNode: true,
        expandAll: true,
        treeData: (tableContext) => {
          return treeMap(tableContext?.dataSource || [], (org) => {
            return {
              key: org.code,
              value: org.id,
              label: org.name,
            } as TreeNodeData;
          });
        },
      } as TableTreeSelectColumnProps<Org>,
      {
        label: '序号',
        field: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'number',
        require: true,
        initValue: 0,
      },
      {
        label: '描述',
        field: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        line: true,
      },
    ];
  },
};

export default OrgHelper;
