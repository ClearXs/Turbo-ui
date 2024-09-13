import { Entity } from '@/api';
import { ListPanelApi, ListPanelProps } from './interface';
import { Toolbar } from '../table-crud/interface';
import { Button, Space } from '@douyinfe/semi-ui';
import {
  ADD_LITERAL_TOOLBAR,
  DESELECT_ALL_LITERAL_TOOLBAR,
  SELECT_ALL_LITERAL_TOOLBAR,
} from '../bar/collection';
import { useListPanelContext } from './context/listPanel';

export interface ListToolbarProps<T extends Entity> {
  props: ListPanelProps<T>;
  listApi: ListPanelApi<T>;
}

export default function ListToolbar<T extends Entity>({
  props,
  listApi,
}: ListToolbarProps<T>) {
  const context = useListPanelContext();

  const toolbars = renderToolbar(props, listApi);

  return (
    <>
      {toolbars.length > 0 && (
        <Space>
          {toolbars.map((bar, index) => {
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

const renderToolbar = <T extends Entity>(
  props: ListPanelProps<T>,
  listApi: ListPanelApi<T>,
) => {
  const { toolbar = {} } = props;
  const {
    showAdd = true,
    showSelectAll = true,
    showDeselectAll = true,
    append = [],
  } = toolbar;

  const bars: Toolbar<T>[] = [];

  if (showAdd) {
    const addToolbar: Toolbar<T> = {
      ...ADD_LITERAL_TOOLBAR,
      onClick(_, formContext) {
        formContext.visible = true;
        formContext.loading = false;
        formContext.type = 'add';
        formContext.setValues(formContext.getDefaultValues());
      },
    };
    bars.push(addToolbar);
  }

  if (showSelectAll) {
    const selectAllToolbar: Toolbar<T> = {
      ...SELECT_ALL_LITERAL_TOOLBAR,
      onClick() {
        listApi.selectAll();
      },
    };
    bars.push(selectAllToolbar);
  }

  if (showDeselectAll) {
    const deselectAllToolbar: Toolbar<T> = {
      ...DESELECT_ALL_LITERAL_TOOLBAR,
      onClick() {
        listApi.unSelectAll();
      },
    };
    bars.push(deselectAllToolbar);
  }

  bars.push(...append);
  return bars;
};
