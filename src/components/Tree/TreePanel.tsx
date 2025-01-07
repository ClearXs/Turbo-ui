import { Tree, TreeGeneralApi } from '@/api';
import { TreePanelProps } from './interface';
import { Tree as SemiTree, Spin } from '@douyinfe/semi-ui';
import { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { find } from '@/util/tree';
import TForm from '../tform/TForm';
import { FormTreeSelectColumnProps } from '../tform/components';
import TreePanelContextImpl from './TreePanelContext';
import TreeToolbar from './TreeToolbar';
import { VIRTUAL_ROOT_VALUE } from './contant';
import TreePanelApiImpl from './TreePanelApi';
import { observer } from '@formily/reactive-react';
import { TPanelContext } from './context/treePanel';

// 树形面板
function TreePanel<T extends Tree>(props: TreePanelProps<T>) {
  const {
    columns,
    multiple = false,
    initValues = [],
    initValue,
    expandAll,
    addDefaultValue,
    useApi,
    onChange,
    onSelectChange,
    getTreePanelApi,
    getTreePanelContext,
  } = props;

  let api: TreeGeneralApi<T>;
  if (typeof useApi === 'function') {
    api = useApi();
  } else {
    api = useApi;
  }

  const treePanelContext = useMemo(() => {
    return new TreePanelContextImpl<T>(props);
  }, []);

  getTreePanelContext?.(treePanelContext);

  const treePanelApi = useMemo(() => {
    return new TreePanelApiImpl<T>(treePanelContext, api);
  }, []);

  getTreePanelApi?.(treePanelApi);

  useEffect(() => {
    if (multiple) {
      treePanelContext.selectKeys = initValues;
    } else if (initValue) {
      treePanelContext.selectKey = initValue;
    }
  }, [initValue, initValues]);

  useEffect(() => {
    treePanelApi.tree();
  }, []);

  // 构建树型视图的数据
  if (columns) {
    for (const col of columns) {
      if (col.type === 'treeSelect') {
        const treeCol = col as FormTreeSelectColumnProps<T>;
        if (treeCol.self) {
          treeCol.treeData =
            treeCol.treeTransform?.(treePanelContext.dataSource) ||
            treePanelContext.tree;
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
          treeData={treePanelContext.tree}
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
      <TForm<T>
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
}

export default observer(TreePanel);
