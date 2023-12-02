import { IdEntity } from '@/api/interface';
import { ListPanelApi, ListPanelProps } from './interface';
import { FormContext } from '../TForm/interface';
import { useEffect, useState } from 'react';
import Tree, { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import {
  Button,
  ButtonGroup,
  Modal,
  Notification,
  Space,
  Spin,
  Tooltip,
} from '@douyinfe/semi-ui';
import TForm from '../TForm';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';
import { directGetIcon } from '../Icon';

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
        api.selectAll();
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
        api.unSelectAll();
      },
    });

  bar.push(...append);
  return bar;
};

const getOperateBar = <T extends IdEntity>(
  props: ListPanelProps<T>,
  api: ListPanelApi<T>,
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
        api.edit(formContext, record);
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
            api.remove(formContext, [record.id]);
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

// 基于Tree的列表面板

const ListPanel = <T extends IdEntity>(props: ListPanelProps<T>) => {
  const api = props.useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [formContext, setFormContext] = useState<FormContext<T>>();
  const [list, setList] = useState<TreeNodeData[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [selectKey, setSelectKey] = useState<string>();

  const listApi = {
    list(formContext) {
      setLoading(true);
      api
        .list()
        .then((res) => {
          const { code, data } = res;
          if (code === 200) {
            const list = data.map((entity) => {
              const operateBar = getOperateBar(props, listApi, entity);
              const treeNode = props.wrap?.(entity);
              return {
                ...treeNode,
                label: (
                  <div className="flex">
                    {treeNode?.label}
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
                                bar.onClick?.(undefined, formContext, entity);
                              }}
                            />
                          </Tooltip>
                        );
                      })}
                    </ButtonGroup>
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
      const newFormContext = {
        ...formContext,
        values: record,
        visible: true,
        type: 'details',
      } as FormContext<T>;
      formContext?.newContext(newFormContext);
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

  const toolbar = getToolbar(props, formContext as FormContext<T>, listApi);
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
                  onClick={() => bar.onClick?.(undefined, formContext)}
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
          model="tree"
          useApi={props.useApi}
          columns={props.columns}
          getFormContext={(formContext) => {
            setFormContext(formContext);
            listApi.list(formContext);
          }}
          onOk={(formContext) => listApi.list(formContext)}
        />
      </Spin>
    </>
  );
};

export default ListPanel;
