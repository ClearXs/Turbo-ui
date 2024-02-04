import useMenuApi, { MenuTree } from '@/api/system/menu';
import { Space, Tag } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { MENU_TYPE } from '@/constant/menutype';
import { TreePanelApi, TreePanelProps } from '@/components/Tree/interface';
import MenuHelper from './helper';
import TreePanel from '@/components/Tree/TreePanel';
import { OperateToolbar } from '@/components/TableCrud/interface';
import { directGetIcon } from '@/components/Icon';

const MenuTreeComponent: React.FC<{
  menuIds?: string[];
  multiple?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showAdd?: boolean;
  showAddSubordinate?: boolean;
  showAddPeer?: boolean;
  showDetails?: boolean;
  getTreeApi?: (api: TreePanelApi<MenuTree>) => void;
  onChange?: TreePanelProps<MenuTree>['onChange'];
}> = ({
  menuIds,
  getTreeApi,
  multiple = true,
  showEdit = false,
  showDelete = false,
  showAdd = false,
  showAddSubordinate = false,
  showAddPeer = false,
  showDetails = true,
  onChange,
}) => {
  const append: OperateToolbar<MenuTree>[] = [];
  if (showAddSubordinate) {
    append.push({
      code: 'addSubordinate',
      name: '添加下级',
      type: 'primary',
      icon: directGetIcon('IconPeer', 'system'),
      onClick: (tableContext, formContext, record) => {
        formContext.visible = true;
        formContext.type = 'add';
        formContext.values = Object.assign(
          { parentId: record.id },
          formContext.getDefaultValues(),
        );
      },
    });
  }
  if (showAddPeer) {
    append.push({
      code: 'addPeer',
      name: '添加同级',
      type: 'primary',
      icon: directGetIcon('IconSubordinate', 'system'),
      onClick: (tableContext, formContext, record) => {
        formContext.visible = true;
        formContext.type = 'add';
        formContext.values = Object.assign(
          { parentId: record.parentId },
          formContext.getDefaultValues(),
        );
      },
    });
  }
  return (
    <TreePanel
      columns={MenuHelper.getColumns()}
      initValues={menuIds}
      multiple={multiple}
      first={false}
      useApi={useMenuApi}
      toolbar={{ showAdd }}
      operateBar={{
        showDetails,
        showEdit,
        showDelete,
        showAdd,
        append,
      }}
      onChange={onChange}
      expandAll
      getTreePanelApi={(treePanelApi) => {
        getTreeApi?.(treePanelApi);
      }}
      label={(tree) => {
        const type = MENU_TYPE.find((v) => v.value === tree.type);
        return (
          <Space>
            <Text>{tree.name}</Text>
            {type && <Tag color={type.tag}>{type.label}</Tag>}
          </Space>
        );
      }}
    />
  );
};

export default MenuTreeComponent;
