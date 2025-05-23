import { Entity, GeneralApi } from '@/api';
import { ListPanelProps } from './interface';
import { useEffect, useMemo } from 'react';
import Tree from '@douyinfe/semi-ui/lib/es/tree';
import { Spin } from '@douyinfe/semi-ui';
import UniForm from '../uni-form/UniForm';
import _ from 'lodash';
import ListPanelContextImpl from './ListPanelContext';
import ListPanelApiImpl from './ListPanelApi';
import ListToolbar from './ListToolbar';
import { observer } from 'mobx-react';
import { TListPanelContext } from './context/listPanel';

const ListPanel = observer(<T extends Entity>(props: ListPanelProps<T>) => {
  const {
    columns,
    multiple = false,
    initValues = [],
    initValue,
    useApi,
    getListPanelApi,
    getListPanelContext,
  } = props;

  let api: GeneralApi<T>;
  if (typeof useApi === 'function') {
    api = useApi();
  } else {
    api = useApi;
  }

  const context = useMemo(() => {
    return new ListPanelContextImpl<T>(props);
  }, []);

  getListPanelContext?.(context);

  const listApi = useMemo(() => {
    return new ListPanelApiImpl<T>(context, api);
  }, []);

  getListPanelApi?.(listApi);

  useEffect(() => {
    if (multiple) {
      context.selectKeys = initValues;
    } else if (initValue) {
      context.selectKey = initValue;
    }
  }, [initValue, initValues]);

  useEffect(() => {
    listApi.list();
  }, []);

  return (
    <>
      <Spin spinning={context.loading}>
        <TListPanelContext.Provider value={context}>
          <ListToolbar<T> props={props} listApi={listApi}></ListToolbar>
          <Tree
            treeData={context.list}
            multiple={multiple}
            filterTreeNode
            showClear
            searchPlaceholder="请输入!"
            motion
            onSearch={(sunInput: string, filteredExpandedKeys: string[]) => {}}
            value={multiple === true ? context.selectKeys : context.selectKey}
            onSelect={(selectKey, selected) => {
              if (multiple) {
                let keys = [...context.selectKeys];
                if (selected) {
                  keys.push(selectKey);
                } else {
                  keys = keys.filter((key) => key !== selectKey);
                }
                context.selectKeys = keys;
              } else {
                context.selectKey = selectKey;
              }
            }}
          />
        </TListPanelContext.Provider>
        <UniForm<T>
          mode="tree"
          useApi={useApi}
          columns={columns}
          getFormContext={(formContext) => {
            context.setFormContext(formContext);
          }}
          onOk={() => listApi.list()}
        />
      </Spin>
    </>
  );
});

export default ListPanel;
