import Table from '@douyinfe/semi-ui/lib/es/table';
import TableHeader from './TableHeader';
import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { IdEntity } from '@/api/interface';
import TableToolbar from './TableToolbar';
import {
  RenderOperatorBarType,
  TableColumnProps,
  TableContext,
  TableCrudProps,
} from './interface';
import { getTableDecorator } from './table';
import CardPage from './CardPage';
import TForm from '../TForm/TForm';
import OperatorButtonSet from './OperatorButtonSet';
import useTableCrudOperatorBar from './TableCrudOperatorBar';
import useTableApi from './TableApi';
import TablePagination from './TablePagination';
import { TableCrudContext } from './context';
import { FormContext } from '../TForm/interface';
import { TFormContext } from '../TForm/context';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

type ObserverTableCrudProps<T extends IdEntity> = {
  tableProps: TableCrudProps<T>;
  tableContext: TableContext<T>;
};

class TableColumnsBuilder<T extends IdEntity> {
  constructor(
    private columns: TableColumnProps<T>[],
    private tableContext: TableContext<T>,
    private props: TableCrudProps<T>,
  ) {}

  // form与table字段的同步
  public sync(): TableColumnsBuilder<T> {
    this.columns = this.columns.map((column, i) => {
      const newColumn = { ...column };
      if (newColumn.dataIndex) {
        newColumn.field = newColumn.dataIndex;
      } else {
        newColumn.dataIndex = newColumn.field;
      }
      if (newColumn.label) {
        newColumn.title = newColumn.label;
      }
      // 排序
      if (!newColumn.index) {
        newColumn.index = i;
      }
      return newColumn;
    });
    return this;
  }

  // table crud columns transfer semi table columns
  public build(
    renderOperatorBars: RenderOperatorBarType<T>,
    exclusiveOperate: boolean = false,
    immediateFilter: boolean = true,
  ): TableColumnProps<T>[] {
    if (_.isEmpty(this.columns)) {
      return [];
    }
    const columns = [...this.columns];
    if (!exclusiveOperate) {
      columns.push({
        title: '操作栏',
        index: Number.MAX_VALUE,
        dataIndex: 'operate',
        field: 'operate',
        align: 'center',
        type: 'undefined',
        fixed: true,
        width: '30%',
        render: (text, record) => {
          const bars = renderOperatorBars(
            record,
            this.props.operateBar,
            this.tableContext.tableApi,
          );
          return (
            <OperatorButtonSet<T>
              bars={bars}
              record={record}
              mode="composite"
              showButtonName={true}
              className="justify-center items-center"
            />
          );
        },
      } as TableColumnProps<T>);
    }
    // 过滤
    const filterColumns = immediateFilter
      ? columns.filter((column) => {
          return (
            (typeof column.table === 'function'
              ? column.table(this.tableContext)
              : column.table) !== false
          );
        })
      : columns;

    return filterColumns.sort(
      (col1, col2) => (col1.index || 0) - (col2.index || 0),
    );
  }
}

function TableCrud<T extends IdEntity>(props: TableCrudProps<T>) {
  const api = props.useApi && props.useApi();
  const renderOperatorBars = useTableCrudOperatorBar<T>();
  // 初始化内容
  const tableApi = useTableApi<T>(props.mode);

  const tableContext = useMemo(() => {
    const decorator = getTableDecorator<T>();
    // table
    const pageable: TablePagination =
      props.mode === 'page'
        ? {
            currentPage: 1,
            pageSize: 10,
            pageSizeOpts: [10, 20],
            showSizeChanger: true,
            showQuickJumper: true,
          }
        : false;
    const tableContext: TableContext<T> = {
      mode: props.mode,
      api,
      tableApi,
      tableColumns: props.columns,
      table: {
        loading: false,
        pagination: pageable,
        selectedRowKeys: [],
      },
      tree: {
        expandAllRows: props.expandAllRows,
      },
      search: props.params || {},
      decorator,
      dataSource: [],
      refresh: () => {
        tableApi.listOrPageOrTree(tableContext, pageable);
      },
      getTableColumns(exclusiveOperate = false, immediateFilter = true) {
        return new TableColumnsBuilder(this.tableColumns || [], this, props)
          .sync()
          .build(renderOperatorBars, exclusiveOperate, immediateFilter);
      },
      setTableColumns(columns) {
        this.tableColumns = columns;
      },
    };
    const observerTableContext = observable(tableContext);
    decorator.setTableContext(observerTableContext);
    return observerTableContext;
  }, [props.params]);

  useEffect(() => {
    tableApi.listOrPageOrTree(tableContext);
  }, [props.params]);

  // tableContext.decorator.setTableContext(tableContext);
  props.getTableContext?.(tableContext);

  return <ObserverTableCrud tableProps={props} tableContext={tableContext} />;
}

const useViewTable = <T extends IdEntity>({
  tableContext,
  tableProps,
}: ObserverTableCrudProps<any>) => {
  const { mode, tableApi } = tableContext;
  if (mode === 'cardPage') {
    return <CardPage tableProps={tableProps} />;
  } else {
    return (
      <Table<T>
        columns={tableContext
          .getTableColumns()
          .map((column) => tableContext.decorator.wrap(column))}
        dataSource={tableContext.dataSource}
        loading={tableContext.table.loading}
        sticky
        key="id"
        rowKey="id"
        pagination={tableContext.table.pagination || false}
        renderPagination={(props) => {
          const { pageSize = 10, currentPage = 1, total = 0 } = props;
          return (
            <div className="fixed bottom-5">
              <TablePagination<T>
                total={total}
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          );
        }}
        expandAllRows={tableContext.tree.expandAllRows}
        bordered
        scroll={{
          y: tableContext.table.pagination || false ? '58vh' : '65vh',
        }}
        rowSelection={{
          selectedRowKeys: tableContext.table.selectedRowKeys,
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
            tableContext.table.selectedRowKeys = selectedRowKeys;
          },
          onSelectAll: (selected, selectedRows) => {
            tableContext.table.selectedRowKeys =
              selectedRows?.map((row) => row?.id) || [];
          },
        }}
        onChange={({ pagination, filters, sorter, extra }) => {
          // 排序
          if (pagination) {
            tableContext.table.pagination = pagination;
          }
          if (sorter) {
            tableApi.sort(tableContext, {
              property: sorter.dataIndex,
              order: sorter.sortOrder,
              sorted: sorter.sorter,
            });
          } else {
            tableApi.listOrPageOrTree(tableContext);
          }
        }}
      />
    );
  }
};

const ObserverTableCrud: React.FC<ObserverTableCrudProps<any>> = observer(
  <T extends IdEntity>(props: ObserverTableCrudProps<T>) => {
    const { tableProps, tableContext } = props;
    const { tableApi } = tableContext;
    const [formContext, setFormContext] = useState<FormContext<T>>();
    const ViewTable = useViewTable({ tableProps, tableContext });
    return (
      <TableCrudContext.Provider value={tableContext}>
        {formContext && (
          <TFormContext.Provider value={formContext}>
            <header>
              <TableHeader<T> key="TableHeader" tableProps={tableProps} />
              <TableToolbar<T> key="TableToolbar" tableProps={tableProps} />
            </header>
            {ViewTable}
          </TFormContext.Provider>
        )}
        <TForm<T>
          mode="table"
          columns={tableProps.columns || []}
          useApi={tableProps.useApi}
          onOk={() => {
            tableApi.listOrPageOrTree(tableContext);
          }}
          getFormContext={setFormContext}
          decorator={tableContext.decorator}
          params={tableProps.params}
        />
      </TableCrudContext.Provider>
    );
  },
);

export default TableCrud;
