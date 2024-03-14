import { IdEntity } from '@/api/interface';
import { ListPanelApi, ListPanelProps } from './interface';
import { FormContext } from '../TForm/interface';
import { useEffect, useRef, useState } from 'react';
import Tree, { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { Button, Notification, Space, Spin } from '@douyinfe/semi-ui';
import { Toolbar } from '../TableCrud/interface';
import { directGetIcon } from '../Icon/shared';
import TForm from '../TForm/TForm';
import useListOperatorBar from './ListOperatorBar';
import OperatorButtonSet from '../TableCrud/OperatorButtonSet';
import _ from 'lodash';

const getToolbar = <T extends IdEntity>(
  props: ListPanelProps<T>,
  formContext: FormContext<T>,
  api: ListPanelApi<T>,
) => {
  const { toolbar = {}, multiple } = props;
  const {
    showAdd = true,
    showSelectAll = true,
    showUnSelectAll = true,
    append = [],
  } = toolbar;

  const bar: Toolbar<T>[] = [];

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
        formContext.type = 'add';
        formContext.values = formContext.getDefaultValues();
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
        api.selectAll();
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
        api.unSelectAll();
      },
    });

  bar.push(...append);
  return bar;
};

// 基于Tree的列表面板
const ListPanel = <T extends IdEntity>(props: ListPanelProps<T>) => {
  const api = props.useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const formContextRef = useRef<FormContext<T>>();
  const [list, setList] = useState<TreeNodeData[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [selectKey, setSelectKey] = useState<string>();
  const renderOperatorBar = useListOperatorBar<T>();

  const listApi = {
    list(formContext) {
      setLoading(true);
      api
        .list()
        .then((res) => {
          const { code, data } = res;
          if (code === 200) {
            const list = data.map((entity) => {
              const bars = renderOperatorBar(entity, props.operateBar, listApi);
              const treeNode = props.wrap?.(entity);
              return {
                ...treeNode,
                label: (
                  <div className="flex">
                    {treeNode?.label}
                    <OperatorButtonSet
                      formContext={formContext}
                      bars={bars}
                      mode="direct"
                      record={entity}
                      className="ml-auto"
                      showButtonName={false}
                    />
                  </div>
                ),
              };
            });
            // 是否选中第一条数据
            // 不是多选并且需要要选中第一条数据
            const { multiple, first = true } = props;
            if (!multiple && first && data.length > 0) {
              setSelectKey(data[0].id);
            }
            setList(list);
          } else {
            Notification.error({ position: 'top', content: res.message });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    },
    details(formContext, record) {
      formContext.visible = true;
      formContext.type = 'details';
      formContext.values = record;
    },
    edit(formContext, record) {
      const newFormContext = {
        ...formContext,
        values: record,
        visible: true,
        type: 'edit',
      } as FormContext<T>;
      formContext.visible = true;
      formContext.type = 'edit';
      formContext.values = record;
    },
    remove(formContext, ids) {
      api.deleteEntity(ids).then((res) => {
        if (res.code === 200 && res.data) {
          this.list(formContext as FormContext<T>);
        } else {
          Notification.error({ position: 'top', content: res.message });
        }
      });
    },
    selectAll: () => {
      setSelectKeys(list.map((entity) => entity.key as string));
    },
    unSelectAll: () => {
      setSelectKeys([]);
    },
    getSelectKey: () => {
      return selectKey;
    },
    getSelectKeys: (): string[] => {
      return selectKeys;
    },
  } as ListPanelApi<T>;

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
    formContextRef.current as FormContext<T>,
    listApi,
  );
  props.getListPanelApi?.(listApi);

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
        <Tree
          treeData={list}
          multiple={props.multiple}
          filterTreeNode
          showClear
          searchPlaceholder="请输入!"
          motion
          onSearch={(sunInput: string, filteredExpandedKeys: string[]) => {}}
          value={props.multiple === true ? selectKeys : selectKey}
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
            }
          }}
        />
        <TForm<T>
          mode="tree"
          useApi={props.useApi}
          columns={props.columns}
          getFormContext={(formContext) => {
            if (_.isEmpty(formContextRef.current)) {
              listApi.list(formContext);
            }
            formContextRef.current = formContext;
          }}
          onOk={(formContext) => listApi.list(formContext)}
        />
      </Spin>
    </>
  );
};

export default ListPanel;
