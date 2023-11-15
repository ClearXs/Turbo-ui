import useMenuApi, { MenuTree } from '@/api/menu';
import { useMemo } from 'react';
import TableCrud, { TableColumnProps } from '@/components/TableCrud/TableCrud';
import { directGetIcon } from '@/components/Icon';
import { MenuTypeList } from '@/constant/menutype';
import _ from 'lodash';

const Menu = () => {
  const columns: TableColumnProps<MenuTree>[] = useMemo(() => {
    return [
      {
        title: '编码',
        dataIndex: 'code',
        type: 'input',
        ellipsis: true,
        align: 'center',
        require: true,
        extraText: '编码需要唯一',
      },
      {
        title: '名称',
        dataIndex: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        title: '别名',
        dataIndex: 'alias',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '路径',
        dataIndex: 'route',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '类型',
        dataIndex: 'type',
        ellipsis: true,
        type: 'select',
        align: 'center',
        optionList: MenuTypeList,
        require: true,
        initValue: 'MENU',
      },
      {
        title: '上级菜单',
        dataIndex: 'parentId',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        table: false,
      },
      {
        title: '图标',
        dataIndex: 'icon',
        ellipsis: true,
        align: 'center',
        type: 'icon',
        require: true,
      },
    ];
  }, []);

  return (
    <>
      <TableCrud<MenuTree>
        model="menu"
        columns={columns}
        useApi={useMenuApi}
        page={false}
        toolbar={[
          {
            name: '展开所有',
            type: 'primary',
            position: 'right',
            icon: directGetIcon('IconExpand'),
            onClick: (tableContext) => {
              const props = tableContext.props;
              const newTableContext = {
                ...tableContext,
                props: {
                  ...props,
                },
              };
              newTableContext.props.expandAllRows = true;
              tableContext.newContext(newTableContext);
            },
          },
          {
            name: '缩放所有',
            type: 'primary',
            position: 'right',
            icon: directGetIcon('IconShrink'),
            onClick: (tableContext) => {
              const props = tableContext.props;
              const newTableContext = {
                ...tableContext,
                props: {
                  ...props,
                },
              };
              newTableContext.props.expandAllRows = false;
              tableContext.newContext(newTableContext);
            },
          },
        ]}
        opearteBar={[
          { name: '添加下级', type: 'primary' },
          { name: '添加同级', type: 'primary' },
        ]}
      />
    </>
  );
};

export default Menu;
