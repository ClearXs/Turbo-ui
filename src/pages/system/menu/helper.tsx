import useMenuApi, { MenuApi, MenuTree } from '@/api/system/menu';
import { MENU_TYPE } from '@/constant/menuType';
import { Helper } from '@/components/interface';
import { Space, Tag } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { treeMap } from '@/util/tree';
import { tryGetIcon } from '@/components/Icon/shared';
import { MENU_ATTR } from '@/constant/menuAttr';
import {
  TableCheckboxColumnProps,
  TableTreeSelectColumnProps,
} from '@/components/TableCrud/components';

const loadMenuTreeData = (
  menus: MenuTree[],
  labelRender: (menu: MenuTree) => React.ReactNode = (menu) => {
    const type = MENU_TYPE.find((v) => v.value === menu.type);
    return (
      <Space>
        <Text>{menu.name}</Text>
        {type && <Tag color={type.tag}>{type.label}</Tag>}
      </Space>
    );
  },
): TreeNodeData[] => {
  return treeMap(menus, (menu) => {
    return {
      key: menu.code,
      value: menu.id,
      label: labelRender?.(menu) || menu.name,
      icon: tryGetIcon(menu.icon),
    } as TreeNodeData;
  });
};

const MenuHelper: Helper<MenuTree, MenuApi> = {
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
        table: false,
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
        table: false,
        reaction: {
          dependencies: ['type'],
          fulfill: {
            schema: {
              'x-visible': "{{$deps[0] !== 'PAGE'}}",
            },
          },
        },
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
        table: false,
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
        self: true,
        treeTransform: loadMenuTreeData,
        treeData: (tableContext) => {
          return loadMenuTreeData(tableContext?.dataSource || []);
        },
      } as TableTreeSelectColumnProps<MenuTree>,
      {
        label: '高级属性',
        field: 'attrs',
        ellipsis: true,
        align: 'center',
        type: 'checkbox',
        table: false,
        line: true,
        options: MENU_ATTR,
      } as TableCheckboxColumnProps<MenuTree>,
    ];
  },
  getApi: useMenuApi,
};

export default MenuHelper;
