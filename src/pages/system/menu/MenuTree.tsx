import useMenuApi, { MenuTree } from '@/api/system/menu';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { useEffect, useRef, useState } from 'react';
import { Space, Tag, Tree } from '@douyinfe/semi-ui';
import { expand, treeMap } from '@/util/tree';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { MENU_TYPE } from '@/constant/menutype';
import { directGetIcon } from '@/components/Icon';

export const loadMenuTreeData = (
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
      icon: directGetIcon(menu.icon),
    } as TreeNodeData;
  });
};

export type MenuTreeProps = {
  // 菜单树初始值
  initValue?: string[];

  getMenuTreeApi?: (menuTreeApi: MenuTreeApi) => void;
};

export type MenuTreeApi = {
  // 获取选择的元素
  getSelected: () => string[];
  // 选择全部
  selectAll: () => void;
  // 取消选择全部
  cancelSelectAll: () => void;
};

const MenuTree: React.FC<MenuTreeProps> = ({
  initValue = [],
  getMenuTreeApi,
}) => {
  const menuApi = useMenuApi();
  const [tree, setTree] = useState<TreeNodeData[]>([]);
  const allKeys = useRef<string[]>([]);
  // 解决闭包问题
  const innerSelectKeys = useRef<string[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

  useEffect(() => {
    menuApi.list().then((res) => {
      if (res.code === 200) {
        const treeNode = loadMenuTreeData(res.data);
        allKeys.current = expand(res.data, 'id');
        setTree(treeNode);
        setKeys(initValue);
      }
      const menuTreeApi: MenuTreeApi = {
        getSelected: () => {
          return innerSelectKeys.current;
        },
        selectAll: () => {
          setKeys(allKeys.current);
        },
        cancelSelectAll: () => {
          setKeys([]);
        },
      };
      getMenuTreeApi?.(menuTreeApi);
    });
  }, [initValue]);

  const setKeys = (keys: string[]) => {
    innerSelectKeys.current = keys;
    setSelectKeys(keys);
  };

  return (
    <>
      <Tree
        value={selectKeys}
        treeData={tree}
        multiple
        showFilteredOnly
        filterTreeNode
        expandAll
        showClear
        onChange={(val) => {
          setKeys(val as string[]);
        }}
      />
    </>
  );
};

export default MenuTree;
