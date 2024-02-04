import useOrgApi, { Org, OrgApi } from '@/api/system/org';
import { TableTreeSelectColumnProps } from '@/components/TableCrud/components';
import { Helper } from '@/components/interface';
import { treeMap } from '@/util/tree';
import { Tag } from '@douyinfe/semi-ui';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

const OrgHelper: Helper<Org, OrgApi> = {
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
        dictionary: 'org',
      },
      {
        label: '上级组织',
        field: 'parentId',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        table: false,
        filterTreeNode: true,
        expandAll: true,
        treeData: (tableContext, formContext) => {
          return treeMap(tableContext?.dataSource || [], (org) => {
            const dic = formContext?.dataSet?.['org']?.find(
              (dic) => dic.value === org.type,
            );
            return {
              key: org.code,
              value: org.id,
              label: (
                <>
                  {org.name} {dic && <Tag color={dic.tag}>{dic.label}</Tag>}
                </>
              ),
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
  getApi: useOrgApi,
};

export default OrgHelper;
