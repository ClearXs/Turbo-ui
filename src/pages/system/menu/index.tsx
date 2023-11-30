import useMenuApi, { MenuTree } from '@/api/system/menu';
import { useMemo } from 'react';
import TableCrud from '@/components/TableCrud/TableCrud';
import { directGetIcon } from '@/components/Icon';
import { MENU_TYPE } from '@/constant/menutype';
import _ from 'lodash';
import { Tag } from '@douyinfe/semi-ui';
import { loadMenuTreeData } from './MenuTree';
import {
  TableColumnProps,
  TableTreeSelectColumnProps,
} from '@/components/TableCrud/interface';
import { FormContext } from '@/components/TForm/interface';

const Menu = () => {
  const columns: TableColumnProps<MenuTree>[] = useMemo(() => {
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
        label: '图标',
        field: 'icon',
        ellipsis: true,
        align: 'center',
        type: 'icon',
        line: true,
      },
      {
        label: '路径',
        field: 'route',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
      {
        label: '类型',
        field: 'type',
        ellipsis: true,
        type: 'select',
        align: 'center',
        optionList: MENU_TYPE,
        require: true,
        initValue: 'MENU',
        render: (text, record) => {
          const menu = MENU_TYPE.find((v) => v.value === record.type);
          return menu && <Tag color={menu.tag || 'amber'}>{menu.label}</Tag>;
        },
      },
      {
        label: '别名',
        field: 'alias',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
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
        label: '上级菜单',
        field: 'parentId',
        ellipsis: true,
        align: 'center',
        type: 'treeSelect',
        table: false,
        filterTreeNode: true,
        expandAll: true,
        treeData: (tableContext) => {
          return loadMenuTreeData(tableContext?.dataSource || []);
        },
      } as TableTreeSelectColumnProps<MenuTree>,
    ];
  }, []);

  return (
    <>
      <TableCrud<MenuTree>
        model="tree"
        columns={columns}
        useApi={useMenuApi}
        toolbar={{
          append: [
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
                    formContext.getDefaultValues(),
                  ),
                };
                formContext.newContext(newFormContext as FormContext<MenuTree>);
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
                    formContext.getDefaultValues(),
                  ),
                };
                formContext.newContext(newFormContext as FormContext<MenuTree>);
              },
            },
          ],
        }}
      />
    </>
  );
};

export default Menu;
