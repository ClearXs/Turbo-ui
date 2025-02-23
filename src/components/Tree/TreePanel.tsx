import { Tree } from '@/api';
import { TreePanelApi, TreePanelContext, TreePanelProps } from './interface';
import { Tree as SemiTree, Space, Spin } from '@douyinfe/semi-ui';
import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { find } from '@/util/tree';
import UniForm from '../uni-form/UniForm';
import {
  FormSelectColumnProps,
  FormTreeSelectColumnProps,
} from '../uni-form/components';
import TreePanelContextImpl from './TreePanelContext';
import TreeToolbar from './TreeToolbar';
import { VIRTUAL_ROOT_VALUE } from './contant';
import TreePanelApiImpl from './TreePanelApi';
import { observer } from 'mobx-react';
import { TPanelContext } from './context/treePanel';
import { loadTreeData } from './tree';
import renderTreeOperatorBar from './TreeOperatorBar';
import ConstantTag from '../tag/ConstantTag';
import { UniFormContext } from '../uni-form/context/form';
import OperatorButtonSet from '../table-crud/OperatorButtonSet';

// 树形面板

const TreePanel: React.FC<TreePanelProps<Tree>> = React.memo((props) => {
  const { useApi, getTreePanelApi, getTreePanelContext } = props;

  const treePanelContext = useMemo(
    () => new TreePanelContextImpl<Tree>(props),
    [],
  );

  getTreePanelContext?.(treePanelContext);

  const treePanelApi = useMemo(
    () => new TreePanelApiImpl<Tree>(treePanelContext, useApi),
    [treePanelContext, useApi],
  );

  getTreePanelApi?.(treePanelApi);

  const ObserverViewTree = useMemo(() => observer(ViewTree), []);

  return (
    <ObserverViewTree
      props={props}
      treePanelApi={treePanelApi}
      treePanelContext={treePanelContext}
    />
  );
}, _.isEqual);

const ViewTree = <T extends Tree>({
  props,
  treePanelApi,
  treePanelContext,
}: {
  props: TreePanelProps<T>;
  treePanelContext: TreePanelContext<T>;
  treePanelApi: TreePanelApi<T>;
}) => {
  const {
    columns,
    multiple = false,
    expandAll,
    addDefaultValue,
    useApi,
    onChange,
    onSelectChange,
    initValue,
    initValues,
  } = props;

  useEffect(() => {
    if (multiple && initValues) {
      treePanelContext.selectKeys = initValues;
    } else if (initValue) {
      treePanelContext.selectKey = initValue;
    }
  }, [initValue, initValues]);

  useEffect(() => {
    treePanelApi.tree();
  }, []);

  const treeData = useMemo(() => {
    let node = treePanelContext.dataSource;
    const { root } = props;
    // 添加根结点显示名称，该结点为虚拟结点
    if (root) {
      const rootNode: Partial<T> = {};
      if (typeof root === 'object') {
        rootNode.name = root.name;
      } else {
        rootNode.name = root;
      }
      rootNode.children = node;
      rootNode.id = VIRTUAL_ROOT_VALUE;
      node = [rootNode];
    }

    return loadTreeData(
      node,
      (tree) => {
        const bars = renderTreeOperatorBar(
          treePanelContext,
          treePanelApi,
          tree,
        ).filter((bar) => {
          const code = bar.code;
          // 如果是ROOT结点，过滤编辑和删除
          if (
            tree.id === VIRTUAL_ROOT_VALUE &&
            (code === 'edit' ||
              code === 'delete' ||
              code === 'details' ||
              code === 'addSubordinate' ||
              code === 'addPeer')
          ) {
            return false;
          }

          // 判断root是否需要add按钮
          if (tree.id === VIRTUAL_ROOT_VALUE && typeof root === 'object') {
            const { showAdd = true } = root.toolbar || {};
            if (
              (typeof showAdd === 'function' && showAdd(treePanelContext)) ||
              showAdd
            ) {
              return true;
            }
          }
          // 非ROOT节点，过滤新增
          if (tree.id !== VIRTUAL_ROOT_VALUE && bar.code === 'add') {
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
              const formContext = treePanelContext.formContext;
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
            <UniFormContext.Provider value={treePanelContext.formContext!}>
              <OperatorButtonSet<T>
                bars={bars}
                showButtonName={false}
                record={tree}
                mode="mixed"
                className="ml-auto"
                aggregate={2}
              />
            </UniFormContext.Provider>
          </div>
        );
      },
      props.depth,
    );
  }, [treePanelContext.dataSource, props.root, props.depth, props.columns]);

  // 构建树型视图的数据
  if (columns) {
    for (const col of columns) {
      if (col.type === 'treeSelect') {
        const treeCol = col as FormTreeSelectColumnProps<T>;
        if (treeCol.self) {
          treeCol.treeData =
            treeCol.treeTransform?.(treePanelContext.dataSource) || treeData;
        }
      }
    }
  }

  return (
    <Spin spinning={treePanelContext.loading}>
      <TPanelContext.Provider value={treePanelContext}>
        <TreeToolbar props={props} treeApi={treePanelApi} />
        <SemiTree
          {...props}
          treeData={treeData}
          multiple={multiple}
          value={
            multiple === true
              ? treePanelContext.selectKeys
              : treePanelContext.selectKey
          }
          filterTreeNode
          showClear
          searchPlaceholder="请输入!"
          motion
          expandAll={expandAll}
          onSearch={(sunInput: string, filteredExpandedKeys: string[]) => {}}
          onSelect={(selectKey, selected) => {
            if (multiple) {
              let keys = [...treePanelContext.selectKeys];
              if (selected) {
                keys.push(selectKey);
              } else {
                keys = keys.filter((key) => key !== selectKey);
              }
              treePanelContext.selectKeys = keys;
            } else {
              if (selectKey === VIRTUAL_ROOT_VALUE) {
                onSelectChange?.(undefined);
              } else {
                onSelectChange?.(selectKey);
              }
              treePanelContext.selectKey = selectKey;
            }
          }}
          onChange={(v) => {
            const element = find(treePanelContext.dataSource, 'id', v);
            onChange?.(element);
          }}
        />
      </TPanelContext.Provider>
      <UniForm<T>
        mode="tree"
        useApi={useApi}
        columns={columns}
        params={addDefaultValue}
        getFormContext={(formContext) => {
          treePanelContext.setFormContext(formContext);
        }}
        onOk={() => treePanelApi.tree()}
      />
    </Spin>
  );
};

export default TreePanel;
