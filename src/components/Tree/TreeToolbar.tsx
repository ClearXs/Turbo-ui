import { Tree } from '@/api';
import { TreePanelApi, TreePanelProps } from './interface';
import {
  ADD_LITERAL_TOOLBAR,
  DESELECT_ALL_LITERAL_TOOLBAR,
  SELECT_ALL_LITERAL_TOOLBAR,
} from '../bar/collection';
import { Toolbar } from '../table-crud/interface';
import { Button, Space } from '@douyinfe/semi-ui';
import { useTreePanelContext } from './context/treePanel';

export interface TreeToolbarProps<T extends Tree> {
  props: TreePanelProps<T>;
  treeApi: TreePanelApi<T>;
}

export default function TreeToolbar<T extends Tree>({
  props,
  treeApi,
}: TreeToolbarProps<T>) {
  const context = useTreePanelContext();
  const toolbar = renderToolbar(props, treeApi);

  return (
    <>
      {toolbar.length > 0 && (
        <Space>
          {toolbar.map((bar, index) => {
            return (
              <Button
                key={index}
                type={bar.type}
                icon={bar.icon}
                onClick={() => bar.onClick?.(undefined, context.formContext)}
              >
                {bar.name}
              </Button>
            );
          })}
        </Space>
      )}
    </>
  );
}

const renderToolbar = <T extends Tree>(
  props: TreePanelProps<T>,
  treeApi: TreePanelApi<T>,
) => {
  const bars: Toolbar<T>[] = [];
  const { toolbar = {} } = props;
  const {
    showAdd = false,
    showSelectAll = false,
    showDeSelectAll = false,
  } = toolbar;

  if (showAdd) {
    const addToolbar: Toolbar<T> = {
      ...ADD_LITERAL_TOOLBAR,
      onClick(tableContext, formContext) {
        formContext.visible = true;
        formContext.loading = false;
        formContext.setValues({});
      },
    };
    bars.push(addToolbar);
  }

  if (showSelectAll) {
    const selectAllToolbar: Toolbar<T> = {
      ...SELECT_ALL_LITERAL_TOOLBAR,
      onClick(tableContext, formContext) {
        treeApi.selectAll();
      },
    };
    bars.push(selectAllToolbar);
  }

  if (showDeSelectAll) {
    const deselectAllToolbar: Toolbar<T> = {
      ...DESELECT_ALL_LITERAL_TOOLBAR,
      onClick(tableContext, formContext) {
        treeApi.unSelectAll();
      },
    };
    bars.push(deselectAllToolbar);
  }

  bars.push(...(props.toolbar?.append || []));
  return bars;
};
