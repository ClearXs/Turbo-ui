// 树形面板
import { Tree } from '@/api/interface';
import { TreePanelApi, TreePanelProps } from './interface';
import {
  Button,
  Notification,
  Tree as SemiTree,
  Space,
  Spin,
} from '@douyinfe/semi-ui';
import { directGetIcon } from '../Icon/shared';
import { FormContext } from '../TForm/interface';
import { useEffect, useRef, useState } from 'react';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import _ from 'lodash';
import { loadTreeData } from './tree';
import { Toolbar } from '../TableCrud/interface';
import { expand, find } from '@/util/tree';
import TForm from '../TForm/TForm';
import useTreeOperatorBar from './TreeOperatorBar';
import OperatorButtonSet from '../TableCrud/OperatorButtonSet';
import ConstantTag from '../Tag/ConstantTag';
import { TFormContext } from '../TForm/context';
import {
  FormSelectColumnProps,
  FormTreeSelectColumnProps,
} from '../TForm/components';

export const VIRTUAL_ROOT_VALUE = 'virtual root';

const getToolbar = <T extends Tree>(
  props: TreePanelProps<T>,
  treeApi: TreePanelApi<T>,
  formContext: FormContext<T>,
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
      code: 'add',
      name: '新增',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconCopyAdd'),
      onClick: () => {
        formContext.visible = true;
        formContext.loading = false;
        formContext.values = {};
      },
    });

  showSelectAll &&
    multiple &&
    bar.push({
      code: 'selectAll',
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
      code: 'unselectAll',
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

function TreePanel<T extends Tree>(props: TreePanelProps<T>) {
  const { columns } = props;
  const api = props.useApi();
  const formContextRef = useRef<FormContext<T>>();

  const [tree, setTree] = useState<TreeNodeData[]>([]);
  // 原始数据
  const originTreeRef = useRef<T[]>([]);
  const [selectKey, setSelectKey] = useState<string>();
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const allKeys = useRef<string[]>([]);
  const renderOperatorBar = useTreeOperatorBar<T>();

  const treePanelApi = {
    tree(formContext) {
      setLoading(true);
      api
        .tree({ entity: props.params })
        .then((res) => {
          const { data, code } = res;
          if (code === 200) {
            originTreeRef.current = data;
            const { first = true, root } = props;
            let node = data;
            // 添加根结点显示名称，该结点为虚拟结点
            if (root) {
              const rootNode: Partial<T> = {};
              rootNode.name = root;
              rootNode.children = node;
              rootNode.id = VIRTUAL_ROOT_VALUE;
              node = [rootNode];
            }
            // 转换树型数据
            let treeData = loadTreeData(
              node,
              (tree) => {
                const bars = renderOperatorBar(
                  props,
                  treePanelApi,
                  tree,
                ).filter((bar) => {
                  // 如果是ROOT结点，过滤编辑和删除
                  if (
                    tree.id === VIRTUAL_ROOT_VALUE &&
                    (bar.code === 'edit' ||
                      bar.code === 'delete' ||
                      bar.code === 'details')
                  ) {
                    return false;
                  }
                  return true;
                });
                // 尝试读取columns中 类型为select的数据，使用其用作label渲染
                const { columns } = props;
                const constants = columns
                  .filter((c) => c.type === 'select')
                  .map((c) => {
                    const selectColumn = c as FormSelectColumnProps<T>;
                    const { dictionary, optionList, field } = selectColumn;
                    if (dictionary) {
                      return formContext?.dataSet?.[dictionary]?.find(
                        (d) => d.value === tree[field],
                      );
                    } else if (optionList) {
                      return optionList.find((o) => o.value === tree[field]);
                    } else {
                      return undefined;
                    }
                  })
                  .filter((c) => c !== undefined);

                const Buttons = (
                  <OperatorButtonSet<T>
                    bars={bars}
                    showButtonName={false}
                    record={tree}
                    mode="mixed"
                    className="ml-auto"
                  />
                );
                return (
                  <div className="flex items-center">
                    {props.label?.(tree) || (
                      <Space>
                        {tree.name}
                        {constants.map((c) => {
                          return <ConstantTag constant={c} />;
                        })}
                      </Space>
                    )}
                    {Buttons}
                  </div>
                );
              },
              props.depth,
            );

            let firstKey;
            if (root && !first) {
              firstKey = node[0].id;
            } else if (first) {
              // root不存在并且选中第一个结点
              firstKey = data[0]?.id;
            }
            if (firstKey) {
              if (firstKey === VIRTUAL_ROOT_VALUE) {
                props.onSelectChange?.(undefined);
              } else {
                props.onSelectChange?.(firstKey);
              }
              setSelectKey(firstKey);
            }
            setTree(treeData);
            // 设置全选数据
            allKeys.current = expand(node, 'id');
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    },
    edit(formContext, record) {
      formContext.visible = true;
      formContext.type = 'edit';
      formContext.values = record;
    },
    details(formContext, record) {
      formContext.visible = true;
      formContext.type = 'details';
      formContext.values = record;
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
    treePanelApi.tree(undefined);
  }, [props.initValue, props.initValues]);

  const toolbar =
    (formContextRef.current &&
      getToolbar(props, treePanelApi, formContextRef.current)) ||
    [];
  props.getTreePanelApi?.(treePanelApi);

  // 构建树型视图的数据
  if (columns) {
    columns.forEach((col) => {
      if (col.type === 'treeSelect') {
        const treeCol = col as FormTreeSelectColumnProps<T>;
        if (treeCol.self) {
          treeCol.treeData =
            treeCol.treeTransform?.(originTreeRef.current) || tree;
        }
      }
    });
  }

  return (
    <>
      <Spin spinning={loading}>
        {formContextRef.current && (
          <TFormContext.Provider value={formContextRef.current}>
            {toolbar.length > 0 && (
              <Space>
                {toolbar.map((bar, index) => {
                  return (
                    <Button
                      key={index}
                      type={bar.type}
                      icon={bar.icon}
                      onClick={() =>
                        bar.onClick?.(undefined, formContextRef.current)
                      }
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
              onSearch={(
                sunInput: string,
                filteredExpandedKeys: string[],
              ) => {}}
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
                  if (selectKey === VIRTUAL_ROOT_VALUE) {
                    props.onSelectChange?.(undefined);
                  } else {
                    props.onSelectChange?.(selectKey);
                  }
                }
              }}
              onChange={(v) => {
                const element = find(originTreeRef.current, 'id', v);
                props.onChange?.(element);
              }}
            />
          </TFormContext.Provider>
        )}
        <TForm<T>
          mode="tree"
          useApi={props.useApi}
          columns={columns}
          params={props.addDefaultValue}
          getFormContext={(formContext) =>
            (formContextRef.current = formContext)
          }
          onOk={(formContext) => treePanelApi.tree(formContext)}
        />
      </Spin>
    </>
  );
}

export default TreePanel;
