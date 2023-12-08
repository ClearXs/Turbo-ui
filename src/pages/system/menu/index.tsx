import useMenuApi, { MenuTree } from '@/api/system/menu';
import TableCrud from '@/components/TableCrud/TableCrud';
import { directGetIcon } from '@/components/Icon';
import _ from 'lodash';
import { TableContext } from '@/components/TableCrud/interface';
import { FormContext } from '@/components/TForm/interface';
import MenuHelper from './helper';

const Menu = () => {
  return (
    <>
      <TableCrud<MenuTree>
        model="tree"
        columns={MenuHelper.getColumns()}
        useApi={useMenuApi}
        expandAllRows
        toolbar={{
          append: [
            {
              name: '展开所有',
              type: 'primary',
              position: 'right',
              icon: directGetIcon('IconExpand'),
              onClick: (tableContext) => {
                const props = tableContext?.props;
                const newTableContext = {
                  ...tableContext,
                  props: {
                    ...props,
                  },
                };
                newTableContext.props.expandAllRows = true;
                tableContext?.newContext(
                  newTableContext as TableContext<MenuTree>,
                );
              },
            },
            {
              name: '缩放所有',
              type: 'primary',
              position: 'right',
              icon: directGetIcon('IconShrink'),
              onClick: (tableContext) => {
                const props = tableContext?.props;
                const newTableContext = {
                  ...tableContext,
                  props: {
                    ...props,
                  },
                };
                newTableContext.props.expandAllRows = false;
                tableContext?.newContext(
                  newTableContext as TableContext<MenuTree>,
                );
              },
            },
          ],
        }}
        operateBar={{
          append: [
            {
              name: '添加下级',
              type: 'primary',
              onClick: (tableContext, formContext, record) => {
                const newFormContext = {
                  ...formContext,
                  visible: true,
                  values: Object.assign(
                    { parentId: record.id },
                    formContext?.getDefaultValues(),
                  ),
                };
                formContext?.newContext(
                  newFormContext as FormContext<MenuTree>,
                );
              },
            },
            {
              name: '添加同级',
              type: 'primary',
              onClick: (tableContext, formContext, record) => {
                const newFormContext = {
                  ...formContext,
                  visible: true,
                  values: Object.assign(
                    { parentId: record.parentId },
                    formContext?.getDefaultValues(),
                  ),
                };
                formContext?.newContext(
                  newFormContext as FormContext<MenuTree>,
                );
              },
            },
          ],
        }}
      />
    </>
  );
};

export default Menu;
