import {
  Button,
  Dropdown,
  Modal,
  Notification,
  Space,
  Spin,
} from '@douyinfe/semi-ui';
import Table, { TablePagination } from '@douyinfe/semi-ui/lib/es/table';
import TableHeader from './TableHeader';
import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import {
  GeneralParams,
  IdEntity,
  Order,
  Pagination,
  TreeGeneralApi,
} from '@/api/interface';
import TableToolbar from './TableToolbar';
import { directGetIcon } from '../Icon';
import {
  OperateToolbar,
  TableApi,
  TableColumnProps,
  TableContext,
  TableCrudProps,
} from './interface';
import { FormContext } from '../TForm/interface';
import TForm from '../TForm';
import { getTableDecorator } from './table';

class TableColumnsBuilder<T extends IdEntity> {
  constructor(
    private columns: TableColumnProps<T>[],
    private operateBar: TableCrudProps<T>['operateBar'] = {},
    private tableApi: TableApi<T>,
    private formContext?: FormContext<T>,
    private tableContext?: TableContext<T>,
  ) {}

  private innerBarBuild(record: T): OperateToolbar<T>[] {
    const bars: OperateToolbar<T>[] = [];
    const {
      showEdit = true,
      showDelete = true,
      append = [],
    } = this.operateBar || {};

    // 编辑
    if ((typeof showEdit === 'function' && showEdit(record)) || showEdit) {
      bars.push({
        name: '编辑',
        type: 'primary',
        size: 'small',
        icon: directGetIcon('IconEditStroked'),
        onClick: (tableContext, formContext, record) => {
          this.tableApi.edit(tableContext, formContext, record.id);
        },
      });
    }
    // 删除
    if (
      (typeof showDelete === 'function' && showDelete(record)) ||
      showDelete
    ) {
      bars.push({
        name: '删除',
        type: 'danger',
        size: 'small',
        icon: directGetIcon('IconDeleteStroked'),
        onClick: (tableContext, formContext, record) => {
          Modal.warning({
            title: '是否确定删除?',
            onOk: () => {
              this.tableApi.remove(tableContext, [record.id]);
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
  }

  // form与table字段的同步
  public sync(): TableColumnsBuilder<T> {
    this.columns = this.columns.map((column) => {
      const newColumn = { ...column };
      if (newColumn.dataIndex) {
        newColumn.field = newColumn.dataIndex;
      } else {
        newColumn.dataIndex = newColumn.field;
      }
      if (newColumn.label) {
        newColumn.title = newColumn.label;
      }
      return newColumn;
    });
    return this;
  }

  // table crud columns transfer semi table columns
  public build(): TableColumnProps<T>[] {
    if (_.isEmpty(this.columns)) {
      return [];
    }
    const columns = [
      ...this.columns,
      {
        title: '操作栏',
        dataIndex: 'operate',
        field: 'operate',
        align: 'center',
        type: 'undefined',
        fixed: true,
        width: '25%',
        render: (text, record) => {
          const bars = this.innerBarBuild(record);
          const renderBars = [];
          const defaultShowBars = bars.splice(0, 2);
          renderBars.push(
            defaultShowBars.map((bar) => {
              return (
                <Button
                  theme="borderless"
                  size={bar.size}
                  icon={bar.icon}
                  type={bar.type}
                  onClick={() =>
                    bar.onClick?.(
                      this.tableContext as TableContext<T>,
                      this.formContext as FormContext<T>,
                      record,
                    )
                  }
                >
                  {bar.name}
                </Button>
              );
            }),
          );
          // 超过两个进行缩略展示
          const abbreviateBars = bars.slice(0);
          if (!_.isEmpty(abbreviateBars)) {
            renderBars.push(
              <Dropdown
                trigger="hover"
                position="leftTop"
                render={
                  <Dropdown.Menu>
                    {abbreviateBars.map((bar) => {
                      return (
                        <Dropdown.Item
                          icon={bar.icon}
                          type={bar.type}
                          onClick={() =>
                            bar.onClick?.(
                              this.tableContext as TableContext<T>,
                              this.formContext as FormContext<T>,
                              record,
                            )
                          }
                        >
                          {bar.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                }
              >
                <Button
                  theme="borderless"
                  icon={directGetIcon('IconMoreStroked')}
                  type="primary"
                />
              </Dropdown>,
            );
          }
          return <Space spacing={0}>{renderBars}</Space>;
        },
      } as TableColumnProps<T>,
    ];
    // 过滤与渲染
    return columns.filter((column) => {
      return (
        (typeof column.table === 'function'
          ? column.table(this.tableContext as TableContext<T>)
          : column.table) !== false
      );
    });
  }
}

function TableCrud<T extends IdEntity>(props: TableCrudProps<T>) {
  const [tableContext, setTableContext] = useState<TableContext<T>>();
  const [formContext, setFormContext] = useState<FormContext<T> | undefined>();
  const api = props.useApi && props.useApi();
  // 初始化内容
  const tableApi = useMemo<TableApi<T>>(() => {
    const check = (tableContext?: TableContext<T>) => {
      if (tableContext === undefined) {
        Notification.error({ position: 'top', content: '未完成初始化' });
        return true;
      }
      if (tableContext.api === undefined) {
        Notification.error({ position: 'top', content: '请提供api接口' });
        return true;
      }
      return false;
    };

    return {
      remove(tableContext, ids) {
        if (check(tableContext)) {
          return;
        }
        const checkedContext = tableContext as TableContext<T>;
        checkedContext.api?.deleteEntity(ids).then((res) => {
          if (res.code === 200 && res.data) {
            Notification.success({
              position: 'top',
              content: '删除成功!',
            });
            this.listOrPageOrTree(tableContext as TableContext<T>);
          } else {
            Notification.error({
              position: 'top',
              content: res.message,
            });
          }
        });
      },
      page(tableContext, pageable) {
        if (check(tableContext)) {
          return;
        }
        const checkedContext = tableContext as TableContext<T>;
        const searchPage = (pageable ||
          checkedContext.table.pagination) as TablePagination;
        const page = {
          current: searchPage?.currentPage,
          size: searchPage?.pageSize,
        } as Pagination<T>;
        const newTableContext = {
          ...tableContext,
          table: {
            ...checkedContext.table,
          },
        };
        newTableContext.table.loading = true;
        checkedContext.newContext(newTableContext as TableContext<T>);

        // 调用接口
        const params: GeneralParams<T> = {
          entity: checkedContext.search as T,
          orders: checkedContext.table.orders,
        };
        checkedContext.api?.page(page, params).then((res) => {
          if (res.code === 200) {
            const data = res.data;
            const pageable: TablePagination = {
              currentPage: data.current,
              pageSize: data.size,
              total: data.total,
            };
            const newTableContext = {
              ...tableContext,
              table: {
                ...checkedContext.table,
              },
            };
            newTableContext.table.loading = false;
            newTableContext.table.selectedRowKeys = [];
            newTableContext.table.pagination = pageable;
            newTableContext.dataSource = data.records as T[];
            checkedContext.newContext(newTableContext as TableContext<T>);
          } else {
            const newTableContext = {
              ...tableContext,
              table: {
                ...checkedContext.table,
              },
            };
            newTableContext.table.loading = false;
            newTableContext.table.selectedRowKeys = [];
            checkedContext.newContext(newTableContext as TableContext<T>);
          }
        });
      },
      list(tableContext: TableContext<T>) {
        if (check(tableContext)) {
          return;
        }
        const checkedContext = tableContext as TableContext<T>;

        const newTableContext = {
          ...tableContext,
          table: {
            ...checkedContext.table,
          },
        };
        newTableContext.table.loading = true;
        checkedContext.newContext(newTableContext);

        // 调用接口
        const params: GeneralParams<T> = {
          entity: checkedContext.search as T,
          orders: checkedContext.table.orders,
        };
        checkedContext.api?.list(params).then((res) => {
          const newTableContext = {
            ...tableContext,
            table: {
              ...tableContext.table,
            },
          };
          if (res.code === 200) {
            const data = res.data;
            newTableContext.dataSource = data as T[];
          }
          newTableContext.table.loading = false;
          newTableContext.table.selectedRowKeys = [];
          newTableContext.table.pagination = false;
          checkedContext.newContext(newTableContext);
        });
      },
      tree(tableContext: TableContext<T>) {
        if (check(tableContext)) {
          return;
        }
        const newTableContext = {
          ...tableContext,
          table: {
            ...tableContext.table,
          },
        };
        newTableContext.table.loading = true;
        tableContext.newContext(newTableContext);
        const params: GeneralParams<T> = {
          entity: tableContext.search as T,
        };
        (tableContext.api as TreeGeneralApi<T>).tree(params).then((res) => {
          const newTableContext = {
            ...tableContext,
            table: {
              ...tableContext.table,
            },
          };
          if (res.code === 200) {
            newTableContext.dataSource = res.data as T[];
          }
          newTableContext.table.loading = false;
          newTableContext.table.selectedRowKeys = [];
          newTableContext.table.pagination = false;
          tableContext.newContext(newTableContext);
        });
      },
      listOrPageOrTree(
        tableContext: TableContext<T>,
        pageable?: TablePagination,
      ) {
        if (tableContext.props.model === 'list') {
          this.list(tableContext);
        } else if (tableContext.props.model === 'page') {
          this.page(tableContext, pageable);
        } else if (tableContext.props.model === 'tree') {
          this.tree(tableContext);
        } else {
          Notification.error({
            position: 'top',
            content: '确定表单模式 list|page|tree',
          });
        }
      },
      edit(
        tableContext: TableContext<T>,
        formContext: FormContext<T>,
        id: string,
      ) {
        if (check(tableContext)) {
          return;
        }
        tableContext.api?.details(id).then((res) => {
          if (res.code === 200 && res.data) {
            const newFormContext = {
              ...formContext,
              visible: true,
              type: 'edit',
              values: res.data,
            } as FormContext<T>;
            formContext.newContext(newFormContext);
          } else {
            Notification.error({ position: 'top', content: res.message });
          }
        });
      },
      details(
        tableContext: TableContext<T>,
        formContext: FormContext<T>,
        id: string,
      ) {
        if (check(tableContext)) {
          return;
        }
        tableContext.api?.details(id).then((res) => {
          if (res.code === 200) {
            const newFormContext = {
              ...formContext,
              visible: true,
              type: 'details',
              values: res.data,
            } as FormContext<T>;
            formContext.newContext(newFormContext);
          } else {
            Notification.error({ position: 'top', content: res.message });
          }
        });
      },
    };
  }, []);

  useEffect(() => {
    // ============ context init ============

    const decorator = getTableDecorator<T>();
    // table
    const pageable: TablePagination =
      props.model === 'page'
        ? {
            currentPage: 1,
            pageSize: 10,
            pageSizeOpts: [10, 20],
            showSizeChanger: true,
            showQuickJumper: true,
          }
        : false;
    const tableContext: TableContext<T> = {
      api,
      props,
      table: {
        loading: false,
        pagination: pageable,
        selectedRowKeys: [],
      },
      search: props.params || {},
      decorator,
      dataSource: [],
      newContext: (context) => {
        decorator.setTableContext(context);
        setTableContext(context);
      },
      refresh: () => {
        tableApi.listOrPageOrTree(tableContext, pageable);
      },
    };
    props.getTableContext?.(tableContext);
    tableContext.newContext(tableContext);
    tableApi.listOrPageOrTree(tableContext, pageable);
  }, [props.model, props.params]);

  const tableColumns: TableColumnProps<T>[] = new TableColumnsBuilder(
    props.columns || [],
    props.operateBar,
    tableApi,
    formContext,
    tableContext,
  )
    .sync()
    .build();

  return (
    <>
      <header>
        {tableContext && (
          <TableHeader<T>
            key="TableHeader"
            tableContext={tableContext}
            tableApi={tableApi}
            columnDecorator={tableContext.decorator}
            params={props.params}
          />
        )}
        {tableContext && formContext && (
          <TableToolbar<T>
            key="TableToolbar"
            tableContext={tableContext}
            formContext={formContext}
            tableApi={tableApi}
          />
        )}
      </header>
      {tableContext && formContext && (
        <Table<T>
          {...props}
          columns={tableColumns.map(
            (column) => tableContext?.decorator.wrap(column),
          )}
          dataSource={tableContext?.dataSource}
          loading={tableContext?.table.loading}
          rowKey={'id'}
          sticky
          pagination={tableContext?.table.pagination || false}
          expandAllRows={tableContext?.props.expandAllRows}
          bordered
          scroll={{
            y: tableContext?.table.pagination || false ? '58vh' : '65vh',
          }}
          rowSelection={{
            selectedRowKeys: tableContext?.table.selectedRowKeys,
            onSelect: (record, selected) => {
              let selectedRowKeys = [
                ...(tableContext?.table.selectedRowKeys || []),
              ];
              if (selected && record?.id) {
                selectedRowKeys.push(record?.id);
              } else {
                selectedRowKeys = selectedRowKeys.filter(
                  (key) => key !== record?.id,
                );
              }
              const newTableContext = {
                ...tableContext,
                table: {
                  ...tableContext?.table,
                },
              } as TableContext<T>;
              newTableContext.table.selectedRowKeys = selectedRowKeys;
              tableContext.newContext(newTableContext);
              setTableContext(newTableContext);
            },
            onSelectAll: (selected, selectedRows) => {
              const newTableContext = {
                ...tableContext,
                table: {
                  ...tableContext?.table,
                },
              } as TableContext<T>;
              newTableContext.table.selectedRowKeys =
                selectedRows?.map((row) => row?.id) || [];
              tableContext.newContext(newTableContext);
            },
          }}
          onChange={({ pagination, filters, sorter, extra }) => {
            const newTableContext = {
              ...tableContext,
              table: { ...tableContext?.table },
            } as TableContext<T>;
            // 排序
            if (sorter) {
              const orders: Order[] = [
                {
                  direction: sorter.sortOrder === 'ascend' ? 'ASC' : 'DESC',
                  property: sorter.dataIndex,
                },
              ];
              newTableContext.table.orders = orders;
            }

            if (pagination) {
              tableApi.page(newTableContext, pagination);
            } else {
              tableApi.list(newTableContext);
            }
          }}
        />
      )}
      {tableContext && (
        <TForm<T>
          model="table"
          columns={props.columns || []}
          useApi={props.useApi}
          onOk={() => {
            tableApi.listOrPageOrTree(tableContext as TableContext<T>);
          }}
          getFormContext={setFormContext}
          decorator={tableContext.decorator}
          params={props.params}
        />
      )}
    </>
  );
}

export default TableCrud;
