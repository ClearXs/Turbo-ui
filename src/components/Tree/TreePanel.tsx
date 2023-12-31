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
  Tag,
  Tooltip,
} from '@douyinfe/semi-ui';
import { directGetIcon } from '../Icon';
import { FormContext, FormSelectColumnProps } from '../TForm/interface';
import { useEffect, useRef, useState } from 'react';
import TForm from '../TForm';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import _ from 'lodash';
import { loadTreeData } from './tree';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';
import { expand } from '@/util/tree';

const getToolbar = <T extends Tree>(
  props: TreePanelProps<T>,
  formContext: FormContext<T>,
  treeApi: TreePanelApi<T>,
) => {
  const bar: Toolbar<T>[] = [];
  const { toolbar = {}, multiple } = props;
  const {
    showAdd = true,
    showSelectAll = true,
    showUnSelectAll = true,
  } = toolbar;
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

  showSelectAll &&
    multiple &&
    bar.push({
      name: '全选',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconCheckList'),
      onClick: () => {
        treeApi.selectAll();
      },
    });

  showUnSelectAll &&
    multiple &&
    bar.push({
      name: '取消全选',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconCheckChoiceStroked'),
      onClick: () => {
        treeApi.unSelectAll();
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
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const allKeys = useRef<string[]>([]);

  const treePanelApi = {
    tree(formContext) {
      setLoading(true);
      api
        .tree()
        .then((res) => {
          if (res.code === 200) {
            // 转换树型数据
            const treeData = loadTreeData(
              res.data,
              (tree) => {
                const operateBar = getOperateBar(props, treePanelApi, tree);
                // 尝试读取columns中 类型为select的数据，使用其用作label渲染
                const { columns } = props;
                const constants = columns
                  .filter((c) => c.type === 'select')
                  .map((c) => {
                    const selectColumn = c as FormSelectColumnProps<T>;
                    const { dic, optionList, field } = selectColumn;
                    if (dic) {
                      return formContext?.dicValues?.[dic]?.find(
                        (d) => d.value === tree[field],
                      );
                    } else if (optionList) {
                      return optionList.find((o) => o.value === tree[field]);
                    } else {
                      return undefined;
                    }
                  })
                  .filter((c) => c !== undefined);
                return (
                  <div className="flex">
                    {props.label?.(tree) || (
                      <Space>
                        {tree.name}
                        {constants.map((c) => {
                          return (
                            <Tag color={c?.tag} prefixIcon={c?.icon}>
                              {c?.label}
                            </Tag>
                          );
                        })}
                      </Space>
                    )}
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
            // 设置全选数据
            allKeys.current = expand(res.data, 'id');
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
    getSelectKeys() {
      return selectKeys;
    },
    selectAll() {
      setSelectKeys(allKeys.current);
    },
    unSelectAll() {
      setSelectKeys([]);
    },
  } as TreePanelApi<T>;

  useEffect(() => {
    const { multiple = false, initValues = [], initValue } = props;
    if (multiple) {
      setSelectKeys(initValues);
    } else if (initValue) {
      setSelectKey(initValue);
    }
  }, [props.initValue, props.initValues]);

  const toolbar = getToolbar(
    props,
    formContext as FormContext<T>,
    treePanelApi,
  );
  props.getTreePanelApi?.(treePanelApi);

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
          multiple={props.multiple}
          value={props.multiple === true ? selectKeys : selectKey}
          filterTreeNode
          showClear
          searchPlaceholder="请输入!"
          motion
          expandAll={props.expandAll}
          onSearch={(sunInput: string, filteredExpandedKeys: string[]) => {}}
          onSelect={(selectKey, selected) => {
            if (props.multiple) {
              let keys = [...selectKeys];
              if (selected) {
                keys.push(selectKey);
              } else {
                keys = keys.filter((key) => key !== selectKey);
              }
              setSelectKeys(keys);
            } else {
              setSelectKey(selectKey);
              selectKey && props.onChange?.(selectKey);
            }
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
