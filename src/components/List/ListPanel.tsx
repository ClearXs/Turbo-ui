import { IdEntity } from '@/api';
import { ListPanelProps } from './interface';
import { useEffect, useMemo } from 'react';
import Tree from '@douyinfe/semi-ui/lib/es/tree';
import { Spin } from '@douyinfe/semi-ui';
import TForm from '../TForm/TForm';
import _ from 'lodash';
import ListPanelContextImpl from './ListPanelContext';
import ListPanelApiImpl from './ListPanelApi';
import ListToolbar from './ListToolbar';
import { observer } from '@formily/reactive-react';
import { TListPanelContext } from './context/listPanel';

const ListPanel = observer(<T extends IdEntity>(props: ListPanelProps<T>) => {
  const {
    columns,
    multiple = false,
    initValues = [],
    initValue,
    useApi,
    getListPanelApi,
  } = props;

  const api = useApi();

  const context = useMemo(() => {
    return new ListPanelContextImpl<T>(props);
  }, []);

  const listApi = useMemo(() => {
    return new ListPanelApiImpl<T>(context, api);
  }, []);

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

  getListPanelApi?.(listApi);

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
        <TForm<T>
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
