import { MenuTree } from '@/api/system/menu';
import TableCrud from '@/components/TableCrud/TableCrud';
import { tryGetIcon } from '@/components/Icon/shared';
import _ from 'lodash';
import MenuHelper from './helper';

const Menu = () => {
  return (
    <TableCrud<MenuTree>
      mode="tree"
      columns={MenuHelper.getColumns()}
      useApi={MenuHelper.getApi}
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
            code: 'shrinkAll',
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
            icon: tryGetIcon('IconSubordinate'),
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

export default Menu;
