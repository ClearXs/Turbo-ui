import Table from '@douyinfe/semi-ui/lib/es/table';
import TableHeader from './TableHeader';
import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Entity } from '@/api';
import TableToolbar from './TableToolbar';
import { TableContext, TableCrudProps } from './interface';
import CardPage from './CardPage';
import UniForm from '../uni-form/UniForm';
import TablePagination from './TablePagination';
import { TableCrudContext } from './context/table';
import { Form } from '@douyinfe/semi-ui';
import TableContextImpl from './TableContext';
import { observer } from 'mobx-react';

type ObserverTableCrudProps<T extends Entity> = {
  tableContext: TableContext<T>;
  tableProps: TableCrudProps<T>;
};

const TableCrud = React.memo(<T extends Entity>(props: TableCrudProps<T>) => {
  const { useApi } = props;

  const tableContext = useMemo(
    () => new TableContextImpl<T>(props, useApi),
    [props],
  );

  props.getTableContext?.(tableContext);

  const { tableApi } = tableContext;

  const ObserverViewTable = useMemo(
    () => observer(ViewTable),
    [tableContext.tableColumns],
  );

  const ObserverTableHeader = useMemo(
    () => observer(TableHeader),
    [tableContext.search],
  );
  const ObserverTableToolbar = useMemo(
    () => observer(TableToolbar),
    [props.params],
  );

  return (
    <>
      <TableCrudContext.Provider value={tableContext}>
        <header>
          <ObserverTableHeader<T> key="TableHeader" tableProps={props} />
          <ObserverTableToolbar<T> key="TableToolbar" tableProps={props} />
        </header>
        <ObserverViewTable<T> tableProps={props} tableContext={tableContext} />
      </TableCrudContext.Provider>
      <UniForm<T>
        mode="table"
        modal={props.modal}
        event={props.event}
        columns={props.columns || []}
        useApi={props.useApi}
        scope={props.scope}
        onOk={() => {
          tableApi.listOrPageOrTree();
        }}
        getFormContext={(formContext) =>
          tableContext.setFormContext(formContext)
        }
        decorator={tableContext.decorator}
        params={props.params}
      />
    </>
  );
}, _.isEqual);

const ViewTable = <T extends Entity>({
  tableContext,
  tableProps,
}: ObserverTableCrudProps<T>) => {
  const { disableDefaultBehavior, params } = tableProps;
  const { mode, tableApi, inlineEditorApi, dataSource } = tableContext;

  useEffect(() => {
    tableApi.listOrPageOrTree(undefined, undefined, {
      onSuccess: () => {
        if (
          disableDefaultBehavior === undefined ||
          disableDefaultBehavior === true
        ) {
          return;
        }
        // set column default in table context data source
        const columns = tableContext.getTableColumns();
        const dataSource = tableContext.dataSource;

        const newDataSource = [...dataSource];
        for (const column of columns) {
          const field = column['field'];
          for (const data of newDataSource) {
            const value = data[field];
            if (_.isEmpty(value) && column.initValue) {
              data[field] = column.initValue;
            }
          }
        }
        tableContext.dataSource = dataSource;
      },
    });
  }, [params, tableContext.search]);

  if (mode === 'cardPage') {
    return <CardPage<T> tableProps={tableProps} />;
  } else {
    const {
      id = 'id',
      height,
      width,
      fixed,
      title,
      bordered = true,
    } = tableProps;

    const columns = tableContext
      .getTableColumns()
      .map((column) => tableContext.decorator.wrap(column));

    const scrollY =
      height === undefined
        ? tableContext.table.pagination || false
          ? '58vh'
          : '65vh'
        : height;

    const scrollX =
      width === undefined
        ? fixed === true
          ? columns.reduce((p, c) => p + Number(c.width), 0)
          : undefined
        : undefined;

    const SemiTable = (
      <Table<T>
        columns={columns}
        title={title}
        bordered={bordered}
        dataSource={dataSource}
        loading={tableContext.table.loading}
        direction="ltr"
        key={id}
        rowKey={id}
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
        scroll={{
          x: scrollX,
          y: scrollY,
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
          fixed: true,
        }}
        onChange={({ pagination, filters, sorter, extra }) => {
          // 排序
          if (pagination) {
            tableContext.table.pagination = pagination;
            inlineEditorApi.clear();
          }
          if (sorter) {
            tableApi.sort({
              property: sorter.dataIndex,
              order: sorter.sortOrder,
              sorted: sorter.sorter,
            });
          } else {
            tableApi.listOrPageOrTree();
          }
        }}
      />
    );

    return (
      <>
        {tableContext.inlineEditorApi.hasElement() ? (
          <Form<{ data: T[] }>
            initValues={{ data: dataSource }}
            getFormApi={(formApi) => inlineEditorApi.setFormApi(formApi)}
          >
            {SemiTable}
          </Form>
        ) : (
          <>{SemiTable}</>
        )}
        <>
          <div className="hidden">{tableContext.inlineEditor.modCount}</div>
        </>
      </>
    );
  }
};

export default TableCrud;
