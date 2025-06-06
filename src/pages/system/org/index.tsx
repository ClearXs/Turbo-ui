import { Org as OrgEntity } from '@/api/system/org';
import TableCrud from '@/components/table-crud';
import OrgHelper from './helper';
import { tryGetIcon } from '@/components/icon/shared';

const OrgPage = () => {
  const orgApi = OrgHelper.getApi();

  return (
    <TableCrud<OrgEntity>
      mode="tree"
      useApi={orgApi}
      columns={OrgHelper.getColumns()}
      expandAllRows
      toolbar={{
        append: [
          {
            code: 'expandAll',
            name: '展开所有',
            type: 'primary',
            position: 'right',
            icon: tryGetIcon('IconExpand'),
            onClick: (tableContext) => {
              tableContext.tree.expandAllRows = true;
            },
          },
          {
            code: 'shrink',
            name: '缩放所有',
            type: 'primary',
            position: 'right',
            icon: tryGetIcon('IconShrink'),
            onClick: (tableContext) => {
              tableContext.tree.expandAllRows = false;
            },
          },
        ],
      }}
      operateBar={{
        append: [
          {
            code: 'addSubordinate',
            name: '添加下级',
            type: 'primary',
            icon: tryGetIcon('IconPeer'),
            onClick: (tableContext, formContext, record) => {
              formContext.visible = true;
              formContext.setValues(
                Object.assign(
                  { parentId: record.id },
                  formContext.getDefaultValues(),
                ),
              );
            },
          },
          {
            code: 'addPeer',
            name: '添加同级',
            type: 'primary',
            icon: tryGetIcon('IconSubordinate'),
            onClick: (tableContext, formContext, record) => {
              formContext.visible = true;
              formContext.setValues(
                Object.assign(
                  { parentId: record.parentId },
                  formContext.getDefaultValues(),
                ),
              );
            },
          },
        ],
      }}
    />
  );
};

export default OrgPage;
