// 树形面板
import { Tree } from '@/api/interface';
import { TreePanelApi, TreePanelProps } from './interface';
import {
  Button,
  ButtonGroup,
  Modal,
  Notification,
  Tree as SemiTree,
  Space,
  Spin,
  Tooltip,
} from '@douyinfe/semi-ui';
import { directGetIcon } from '../Icon';
import { FormContext } from '../TForm/interface';
import { useEffect, useState } from 'react';
import TForm from '../TForm';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import _ from 'lodash';
import { loadTreeData } from './tree';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';

const getToolbar = <T extends Tree>(
  props: TreePanelProps<T>,
  formContext: FormContext<T>,
) => {
  const bar: Toolbar<T>[] = [];
  const { toolbar = {} } = props;
  const { showAdd = true } = toolbar;
  showAdd &&
    bar.push({
      name: '新增',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconCopyAdd'),
      onClick: () => {
        const newFormContext = {
          ...formContext,
          visible: true,
          loading: false,
          type: 'add',
          values: formContext.getDefaultValues(),
        } as FormContext<T>;
        formContext?.newContext(newFormContext);
      },
    });
  bar.push(...(props.toolbar?.append || []));
  return bar;
};

const getOperateBar = <T extends Tree>(
  props: TreePanelProps<T>,
  treePanelApi: TreePanelApi<T>,
  record: T,
) => {
  const bars: OperateToolbar<T>[] = [];
  const {
    showEdit = true,
    showDelete = true,
    append = [],
  } = props.operateBar || {};

  // 编辑
  if ((typeof showEdit === 'function' && showEdit(record)) || showEdit) {
    bars.push({
      name: '编辑',
      type: 'primary',
      size: 'small',
      icon: directGetIcon('IconEditStroked'),
      onClick: (tableContext, formContext, record) => {
        treePanelApi.edit(formContext, record);
      },
    });
  }

  // 删除
  if ((typeof showDelete === 'function' && showDelete(record)) || showDelete) {
    bars.push({
      name: '删除',
      type: 'danger',
      size: 'small',
      icon: directGetIcon('IconDeleteStroked'),
      onClick: (tableContext, formContext, record) => {
        Modal.warning({
          title: '是否确定删除?',
          onOk: () => {
            treePanelApi.remove(formContext, [record.id]);
          },
        });
      },
    });
  }

  append.forEach((bar) => {
    if (typeof bar === 'function') {
      const maybeBar = bar(record);
      if (maybeBar) {
        bars.push(maybeBar);
      }
    } else {
      bars.push(bar);
    }
  });

  return bars;
};

function TreePanel<T extends Tree>(props: TreePanelProps<T>) {
  const api = props.useApi();
  const [formContext, setFormContext] = useState<FormContext<T>>();
  const [tree, setTree] = useState<TreeNodeData[]>([]);
  const [selectKey, setSelectKey] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const treePanelApi = {
    tree(formContext) {
      setLoading(true);
      api
        .tree()
        .then((res) => {
          if (res.code === 200) {
            const treeData = loadTreeData(
              res.data,
              (tree) => {
                const operateBar = getOperateBar(props, treePanelApi, tree);
                return (
                  <div className="flex">
                    {props.label?.(tree) || tree.name}
                    <ButtonGroup className="ml-auto" theme="borderless">
                      {operateBar.map((bar, index) => {
                        return (
                          <Tooltip content={bar.name} key={index}>
                            <Button
                              icon={bar.icon}
                              type={bar.type}
                              size={bar.size}
                              onClick={(event) => {
                                event.stopPropagation();
                                bar.onClick?.(undefined, formContext, tree);
                              }}
                            />
                          </Tooltip>
                        );
                      })}
                    </ButtonGroup>
                  </div>
                );
              },
              props.depth,
            );
            const { first = true } = props;
            if (first) {
              const firstKey = res.data[0]?.id;
              props.onChange?.(firstKey);
              setSelectKey(firstKey);
            }
            setTree(treeData);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    },
    edit(formContext, record) {
      const newFormContext = {
        ...formContext,
        values: record,
        visible: true,
        type: 'edit',
      } as FormContext<T>;
      formContext?.newContext(newFormContext);
    },
    details(formContext, record) {
      const newFormContext = {
        ...formContext,
        values: record,
        visible: true,
        type: 'details',
      } as FormContext<T>;
      formContext?.newContext(newFormContext);
    },
    remove(formContext, ids) {
      api.deleteEntity(ids).then((res) => {
        if (res.code === 200 && res.data) {
          this.tree(formContext as FormContext<T>);
        } else {
          Notification.error({ position: 'top', content: res.message });
        }
      });
    },
    getSelectKey() {
      return selectKey;
    },
  } as TreePanelApi<T>;

  useEffect(() => {
    const { initValue } = props;
    if (initValue) {
      setSelectKey(initValue.id);
    }
    props.getTreePanelApi?.(treePanelApi);
  }, []);

  const toolbar = getToolbar(props, formContext as FormContext<T>);

  return (
    <>
      <Spin spinning={loading}>
        {toolbar.length > 0 && (
          <Space>
            {toolbar.map((bar, index) => {
              return (
                <Button
                  key={index}
                  type={bar.type}
                  icon={bar.icon}
                  onClick={() => bar.onClick?.(undefined, formContext)}
                >
                  {bar.name}
                </Button>
              );
            })}
          </Space>
        )}
        <SemiTree
          {...props}
          treeData={tree}
          value={selectKey}
          filterTreeNode
          showClear
          searchPlaceholder="请输入!"
          motion
          expandAll={props.expandAll}
          onSearch={(sunInput: string, filteredExpandedKeys: string[]) => {}}
          onChange={(value) => {
            value && setSelectKey(value.toString());
            value && props.onChange?.(value.toString());
          }}
        />
        <TForm<T>
          model="tree"
          useApi={props.useApi}
          columns={props.columns}
          getFormContext={(formContext) => {
            setFormContext(formContext);
            treePanelApi.tree(formContext);
          }}
          onOk={(formContext) => treePanelApi.tree(formContext)}
        />
      </Spin>
    </>
  );
}

export default TreePanel;
