import {
  Button,
  Dropdown,
  Modal,
  Notification,
  Space,
} from '@douyinfe/semi-ui';
import Table, {
  Align,
  ColumnProps,
  ColumnRender,
  ColumnTitle,
  Data,
  Filter,
  FilterIcon,
  Fixed,
  OnCell,
  OnFilter,
  OnFilterDropdownVisibleChange,
  OnHeaderCell,
  RenderFilterDropdownItem,
  TablePagination,
  TableProps,
} from '@douyinfe/semi-ui/lib/es/table';
import TableHeader from './TableHeader';
import { useEffect, useMemo, useState } from 'react';
import TableForm from './TableForm';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { TableContextState } from '@/hook/table';
import { GeneralApi, Pagination } from '@/api/api';
import TableToolbar from './TableToolbar';
import { directGetIcon } from '../Icon';
import { RuleItem } from '@douyinfe/semi-ui/lib/es/form';
import { Constant } from '@/constant/interface';
import { DropdownProps } from '@douyinfe/semi-ui/lib/es/dropdown';
import {
  ColumnDecorator,
  ColumnType,
  Field,
  IconField,
  InputField,
  NumberField,
  RadioField,
  SelectField,
  TableApi,
  TextAreaField,
  TreeSelectField,
  UndefinedField,
} from './table';

// ======================== props ========================

type Bar<T extends Record<string, any>> = {
  name: string;
  type: 'warning' | 'primary' | 'tertiary' | 'secondary' | 'danger';
  size?: 'default' | 'small' | 'large';
  icon?: React.ReactNode;
  onClick?: (tableContext: TableContext<T>) => void;
};

export type Toolbar<T extends Record<string, any>> = Bar<T> & {
  position: 'left' | 'right';
};

// 操作列类型
export type OpearteToolbar<T extends Record<string, any>> = Bar<T> & {
  onClick?: (tableContext: TableContext<T>, value: T) => void;
};

export type TableCrudProps<T extends Record<string, any> = any> = Omit<
  TableProps<T>,
  'columns' | 'pagination'
> & {
  // ⚠️表示当前crud关键标识
  // 它会寻找/api/目录下已该标识为前缀的ts文件，用于构建crud
  model: string;
  // 表格工具栏，组件中包含默认的工具栏，可以自定义添加
  toolbar?: Toolbar<T>[];
  columns?: TableColumnProps<T>[];
  // 操作列
  opearteBar?: OpearteToolbar<T>[];
  // table使用的api
  useApi: () => GeneralApi<T>;
  // 是否需要分页
  page: boolean;
};

export type TableColumnProps<T extends Record<string, any> = any> = {
  [x: string]: any;
  dataIndex: string;
  // 字段类型
  type: ColumnType;
  // 当前column是否在table中显示，默认为true
  table?: boolean;
  // 当前column是否在form中显示，默认为true
  form?: boolean;
  // 是否支持搜索，如果true则把column展示在搜索栏中，默认false
  search?: boolean;
  // 快捷的表单必填项，如果search = true，则默认 = false
  require?: boolean | ((record: T) => boolean);
  // 表格表单校验规则
  rules?: RuleItem[];
  // 该字段是否进行排序
  sort?: boolean;
  // 表单字段初始值
  initValue?: any;
  // 表单文本拓展
  extraText?: string;
  align?: Align;
  children?: Array<ColumnProps<T>>;
  className?: string;
  colSpan?: number;
  defaultFilteredValue?: any[];
  filterChildrenRecord?: boolean;
  filterDropdown?: React.ReactNode;
  filterDropdownProps?: DropdownProps;
  filterDropdownVisible?: boolean;
  filterIcon?: FilterIcon;
  filterMultiple?: boolean;
  filteredValue?: any[];
  filters?: Filter[];
  fixed?: Fixed;
  key?: string | number;
  render?: ColumnRender<T>;
  renderFilterDropdownItem?: RenderFilterDropdownItem;
  sortChildrenRecord?: boolean;
  title?: ColumnTitle;
  useFullRender?: boolean;
  width?: string | number;
  onCell?: OnCell<T>;
  onFilter?: OnFilter<T>;
  onFilterDropdownVisibleChange?: OnFilterDropdownVisibleChange;
  onHeaderCell?: OnHeaderCell<T>;
  ellipsis?:
    | boolean
    | {
        showTitle: boolean;
      };
  resize?: boolean;
};

// Input 组件
export type TableInputColumnProps<T extends Record<string, any> = any> =
  TableColumnProps<T> & {};

// InputNumber 组件
export type TableInputNumberColumnProps<T extends Record<string, any> = any> =
  TableColumnProps<T> & {};

// Select 组件
export type TableSelectColumnProps<T extends Record<string, any> = any> =
  TableColumnProps<T> & {
    optionList?: Constant[];
  };

// TreeSelect 组件
export type TableTreeSelectColumnProps<T extends Record<string, any> = any> =
  TableColumnProps<T> & {};

// Radio 组件
export type TableRadioColumnProps<T extends Record<string, any> = any> =
  TableColumnProps<T> & {};

// textarea 组件
export type TableTextAreaColumnProps<T extends Record<string, any> = any> =
  TableColumnProps<T> & {};

// ======================== operate ========================

// 联系Table crud组件，进行数据操作传输
export type TableContext<T extends Record<string, any> = any> = {
  api: GeneralApi<T> | undefined;
  props: TableCrudProps<T>;
  // 表头搜索值
  search: {
    [key: string]: any;
  };
  table: {
    // table loading
    loading?: boolean;
    // table分页器
    pagination?: TablePagination;
    // 行选择keys
    selectedRowKeys: string[];
  };
  form: FormContext<T>;

  newContext: (newTableContext: TableContext<T>) => void;
};

export type FormContext<T> = {
  // 弹窗类型
  type: 'add' | 'edit' | 'details' | undefined;
  visible: boolean;
  // 表单加载
  loading: boolean;
  values?: T;
};

function TableCrud<T extends Record<string, any> = Data>(
  props: TableCrudProps<T>,
) {
  const [tableContext, setTableContext] = useRecoilState(TableContextState);
  const api = props.useApi && props.useApi();
  const [dataSource, setDatasource] = useState<T[]>([]);

  // 初始化内容
  const tableApi = useMemo<TableApi<T>>(() => {
    const checkApi = (tableContext: TableContext<T>) => {
      return (
        !tableContext.api &&
        Notification.error({ position: 'top', content: '请提供api接口' })
      );
    };

    const saveOrUpdate = (tableContext: TableContext<T>, entity: T) => {
      if (checkApi(tableContext)) {
        return;
      }
      const newTableContext = {
        ...tableContext,
        form: {
          ...tableContext.form,
        },
      };
      newTableContext.form.loading = true;
      setTableContext(newTableContext);

      tableContext.api &&
        tableContext.api
          .saveOrUpdate(entity)
          .then((res) => {
            const newTableContext = {
              ...tableContext,
              form: {
                ...tableContext.form,
              },
            };
            newTableContext.form.visible = true;
            newTableContext.form.loading = false;
            if (res.code === 200) {
              Notification.success({ position: 'top', content: res.message });
              newTableContext.form.visible = false;
              pageOrList(newTableContext);
            } else {
              setTableContext(newTableContext);
            }
          })
          .catch(() => {
            const newTableContext = {
              ...tableContext,
              form: {
                ...tableContext.form,
              },
            };
            newTableContext.form.loading = false;
            setTableContext(newTableContext);
          });
    };
    const remove = (tableContext: TableContext<T>, ids: string[]) => {
      if (checkApi(tableContext)) {
        return;
      }

      tableContext.api &&
        tableContext.api.deleteEntity(ids).then((res) => {
          if (res.code === 200 && res.data) {
            Notification.success({
              position: 'top',
              content: '删除成功!',
            });
            pageOrList(tableContext as TableContext);
          } else {
            Notification.error({
              position: 'top',
              content: res.message,
            });
          }
        });
    };
    const page = (
      tableContext: TableContext<T>,
      pageable?: TablePagination,
    ) => {
      if (checkApi(tableContext)) {
        return;
      }
      const searchPage = (pageable ||
        tableContext.table.pagination) as TablePagination;
      const page = {
        current: searchPage?.currentPage,
        size: searchPage?.pageSize,
      } as Pagination<T>;
      const newTableContext = {
        ...tableContext,
        table: {
          ...tableContext.table,
        },
      };
      newTableContext.table.loading = true;

      setTableContext(newTableContext);
      // 执行分页操作
      tableContext.api &&
        tableContext.api.page(page, tableContext?.search as T).then((res) => {
          if (res.code === 200) {
            const data = res.data;
            const pageable: TablePagination = {
              currentPage: data.current,
              pageSize: data.size,
              total: data.total,
            };
            setDatasource(data.records as T[]);
            const newTableContext = {
              ...tableContext,
              table: {
                ...tableContext.table,
              },
            };
            newTableContext.table.loading = false;
            newTableContext.table.selectedRowKeys = [];
            newTableContext.table.pagination = pageable;
            setTableContext(newTableContext);
          } else {
            const newTableContext = {
              ...tableContext,
              table: {
                ...tableContext.table,
              },
            };
            newTableContext.table.loading = false;
            newTableContext.table.selectedRowKeys = [];
            setTableContext(newTableContext);
          }
        });
    };
    const list = (tableContext: TableContext) => {
      if (checkApi(tableContext)) {
        return;
      }
      const newTableContext = {
        ...tableContext,
        table: {
          ...tableContext.table,
        },
      };
      newTableContext.table.loading = true;
      setTableContext(newTableContext);

      tableContext.api &&
        tableContext.api.list(tableContext.search as T).then((res) => {
          if (res.code === 200) {
            const data = res.data;
            setDatasource(data as T[]);
          }
          const newTableContext = {
            ...tableContext,
            table: {
              ...tableContext.table,
            },
          };
          newTableContext.table.loading = false;
          newTableContext.table.selectedRowKeys = [];
          newTableContext.table.pagination = false;
          setTableContext(newTableContext);
        });
    };

    const pageOrList = (
      tableContext: TableContext<T>,
      pageable?: TablePagination,
    ) => {
      if (tableContext.table.pagination) {
        page(tableContext, pageable);
      } else {
        list(tableContext);
      }
    };

    const details = (tableContext: TableContext<T>, id: string) => {
      if (checkApi(tableContext)) {
        return;
      }
      tableContext.api &&
        tableContext.api.details(id).then((res) => {
          if (res.code === 200) {
            const newTableContext = {
              ...tableContext,
              form: {
                ...tableContext.form,
              },
            };
            newTableContext.form.type = 'details';
            newTableContext.form.visible = true;
            newTableContext.form.values = res.data;
            setTableContext(newTableContext);
          }
        });
    };
    return { saveOrUpdate, remove, page, list, pageOrList, details };
  }, []);

  const columnDecorator = useMemo<ColumnDecorator<T>>(() => {
    const fields: Record<ColumnType, Field<T, any>> = {
      input: new InputField<T>(),
      number: new NumberField<T>(),
      radio: new RadioField<T>(),
      select: new SelectField<T>(),
      textarea: new TextAreaField<T>(),
      treeSelect: new TreeSelectField<T>(),
      icon: new IconField<T>(),
      undefined: new UndefinedField<T>(),
    };

    return {
      render: (
        column: TableColumnProps<T>,
        type: 'search' | 'form',
      ): React.ReactNode | undefined => {
        return fields[column.type]?.render(column, type);
      },
      wrap: (column: TableColumnProps<T>): ColumnProps<T> => {
        return fields[column.type || 'undefined']?.wrap(column);
      },
    };
  }, []);

  // 默认操作列按钮
  const defaultOperateBar = useMemo(() => {
    return [
      {
        name: '编辑',
        type: 'primary',
        size: 'small',
        icon: directGetIcon('IconEditStroked'),
        onClick: (tableContext, record) => {
          const newTableContext = {
            ...tableContext,
            form: {
              ...tableContext.form,
            },
          };
          newTableContext.form.type = 'edit';
          newTableContext.form.visible = true;
          newTableContext.form.loading = false;
          newTableContext.form.values = record;
          setTableContext(newTableContext);
        },
      },
      {
        name: '明细',
        type: 'primary',
        size: 'small',
        icon: directGetIcon('IconIssueStroked'),
        onClick: (tableContext, record) => {
          tableApi.details(tableContext, record.id);
        },
      },
      {
        name: '删除',
        type: 'danger',
        size: 'small',
        icon: directGetIcon('IconDeleteStroked'),
        onClick: (tableContext, record) => {
          Modal.warning({
            title: '是否确定删除?',
            onOk: () => {
              tableApi.remove(tableContext, [record.id]);
            },
          });
        },
      },
    ] as OpearteToolbar<T>[];
  }, []);

  useEffect(() => {
    // ============ context init ============
    // table
    const pageable: TablePagination = props.page
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
      search: {},
      form: {
        type: 'add',
        visible: false,
        loading: false,
      },
      newContext: setTableContext,
    };
    setTableContext(tableContext);

    tableApi.pageOrList(tableContext, pageable);
  }, [props.model]);

  const tableColumns = [
    ...(props.columns || []),
    {
      title: '操作列',
      dataIndex: 'operate',
      align: 'center',
      type: 'undefined',
      render: (text, record) => {
        const opearteBar = [...defaultOperateBar, ...(props.opearteBar || [])];
        // 超过三个进行缩略展示
        return opearteBar.length > 3 ? (
          <Dropdown
            trigger="hover"
            render={
              <Dropdown.Menu>
                {opearteBar.map((bar) => {
                  return (
                    <Dropdown.Item
                      icon={bar.icon}
                      type={bar.type}
                      onClick={() =>
                        bar.onClick &&
                        bar.onClick(tableContext as TableContext, record)
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
              type="secondary"
            />
          </Dropdown>
        ) : (
          <Space spacing={2}>
            {opearteBar.map((bar) => {
              return (
                <Button
                  theme="borderless"
                  size={bar.size}
                  icon={bar.icon}
                  type={bar.type}
                  onClick={() =>
                    bar.onClick &&
                    bar.onClick(tableContext as TableContext, record)
                  }
                >
                  {bar.name}
                </Button>
              );
            })}
          </Space>
        );
      },
    } as TableColumnProps<T>,
  ];

  return (
    <>
      <header>
        <TableHeader
          key="TableHeader"
          columns={tableColumns}
          tableApi={tableApi}
          columnDecorator={columnDecorator}
        />
        <TableToolbar
          key="TableToolbar"
          toolbar={props.toolbar}
          tableApi={tableApi}
        />
      </header>
      <Table<T>
        {...props}
        columns={tableColumns
          .filter((column) => column.table !== false)
          .map((column) => columnDecorator.wrap(column))}
        dataSource={dataSource}
        rowKey={'id'}
        pagination={tableContext?.table.pagination || false}
        loading={tableContext?.table.loading}
        expandAllRows={tableContext?.props.expandAllRows}
        scroll={{ y: '50vh' }}
        rowSelection={{
          selectedRowKeys: tableContext?.table.selectedRowKeys,
          onSelect: (record, selected) => {
            let selectedRowKeys = [
              ...(tableContext?.table.selectedRowKeys || []),
            ];
            if (selected) {
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
            } as TableContext;
            newTableContext.table.selectedRowKeys = selectedRowKeys;
            setTableContext(newTableContext);
          },
          onSelectAll: (selected, selectedRows) => {
            const newTableContext = {
              ...tableContext,
              table: {
                ...tableContext?.table,
              },
            } as TableContext;
            newTableContext.table.selectedRowKeys =
              selectedRows?.map((row) => row?.id) || [];
            setTableContext(newTableContext);
          },
        }}
        onChange={({ pagination }) => {
          tableApi.page(tableContext as TableContext, pagination);
        }}
      />
      <TableForm
        key="TableForm"
        columns={tableColumns}
        tableApi={tableApi}
        columnDecorator={columnDecorator}
      />
    </>
  );
}

export default TableCrud;
