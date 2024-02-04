import { Org } from '@/api/system/org';
import TableCrud from '@/components/TableCrud';
import OrgHelper from './helper';
import { directGetIcon } from '@/components/Icon/shared';

const Org: React.FC = () => {
  return (
    <TableCrud<Org>
      mode="tree"
      useApi={OrgHelper.getApi}
      columns={OrgHelper.getColumns()}
      expandAllRows
      toolbar={{
        append: [
          {
            code: 'expandAll',
            name: '展开所有',
            type: 'primary',
            position: 'right',
            icon: directGetIcon('IconExpand'),
            onClick: (tableContext) => {
              tableContext.tree.expandAllRows = true;
            },
          },
          {
            code: 'shrink',
            name: '缩放所有',
            type: 'primary',
            position: 'right',
            icon: directGetIcon('IconShrink'),
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
            onClick: (tableContext, formContext, record) => {
              formContext.visible = true;
              formContext.values = Object.assign(
                { parentId: record.id },
                formContext.getDefaultValues(),
              );
            },
          },
          {
            code: 'addPeer',
            name: '添加同级',
            type: 'primary',
            onClick: (tableContext, formContext, record) => {
              formContext.visible = true;
              formContext.values = Object.assign(
                { parentId: record.parentId },
                formContext.getDefaultValues(),
              );
            },
          },
        ],
      }}
    />
  );
};

export default Org;
