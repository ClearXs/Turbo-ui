import {
  GeneralParams,
  IdEntity,
  Order,
  Pagination,
  TreeGeneralApi,
} from '@/api';
import {
  DataMode,
  SortColumn,
  TableApi,
  TableContext,
  TableCrudProps,
} from './interface';
import { useMemo } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import {
  TablePagination,
  TablePaginationProps,
} from '@douyinfe/semi-ui/lib/es/table';
import { FormContext } from '../TForm/interface';

const check = <T extends IdEntity>(tableContext: TableContext<T>) => {
  if (tableContext === undefined) {
    Toast.error('未完成初始化!');
    return true;
  }
  // api不存在
  if (tableContext.api === undefined) {
    return true;
  }
  // 不具有api可操作性
  if (tableContext.props.operability === false) {
    return true;
  }
  return false;
};

type EventHandler<T extends IdEntity> = {
  onRemoveAfter: (props: TableCrudProps<T>, ids: T['id'][]) => void;
  onQueryAfter: (
    props: TableCrudProps<T>,
    tableContext: TableContext<T>,
    pageable?: TablePagination,
  ) => void;
};

export default function useTableApi<T extends IdEntity>(
  mode: TableCrudProps<T>['mode'],
  dataMode: DataMode,
) {
  return useMemo<TableApi<T>>(() => {
    const eventHandler: EventHandler<T> = {
      onRemoveAfter: function (props, ids): void {
        const { event } = props;
        try {
          event?.onDeleteSuccess?.(ids);
        } catch (err) {
          console.error(err);
        }
      },
      onQueryAfter: function (props, tableContext, pageable): void {
        const { event } = props;
        try {
          event?.onQuerySuccess?.(tableContext, pageable);
        } catch (err) {
          console.error(err);
        }
      },
    };
    if (dataMode === 'local') {
      return new DefaultTableApi(mode, eventHandler);
    } else {
      return new RemoteTableApi(mode, eventHandler);
    }
  }, []);
}

class DefaultTableApi<T extends IdEntity> implements TableApi<T> {
  constructor(
    private mode: TableCrudProps<T>['mode'],
    private eventHandler: EventHandler<T>,
  ) {}

  remove(tableContext: TableContext<T>, ids: string[]): void {
    throw new Error('Method not implemented.');
  }
  list(tableContext: TableContext<T>): void {
    // TODO should be add filter
  }
  page(
    tableContext: TableContext<T>,
    pageable?: TablePagination | undefined,
  ): void {
    // TODO should be add filter and fake page
  }
  tree(tableContext: TableContext<T>): void {
    // TODO should be add filter
  }
  listOrPageOrTree(
    tableContext: TableContext<T>,
    pageable?: TablePagination | undefined,
  ): void {
    if (this.mode === 'list') {
      this.list(tableContext);
    } else if (this.mode === 'page' || this.mode === 'cardPage') {
      this.page(tableContext, pageable);
    } else if (this.mode === 'tree') {
      this.tree(tableContext);
    }
  }
  details(
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    id: string,
  ): void {
    const { idKey, dataSource } = tableContext;
    const value = dataSource.find((data) => data[idKey] === id);
    formContext.visible = true;
    formContext.type = 'details';
    formContext.values = value;
  }
  edit(
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    id: string,
  ): void {
    const { idKey, dataSource } = tableContext;
    const value = dataSource.find((data) => data[idKey] === id);
    formContext.visible = true;
    formContext.type = 'edit';
    formContext.values = value;
  }
  sort(tableContext: TableContext<T>, sortColumn: SortColumn): void {
    throw new Error('Method not implemented.');
  }
}

/**
 * base on remote invoke.
 */
class RemoteTableApi<T extends IdEntity> implements TableApi<T> {
  constructor(
    private mode: TableCrudProps<T>['mode'],
    private eventHandler: EventHandler<T>,
  ) {}

  remove(tableContext: TableContext<T>, ids: string[]): void {
    if (check(tableContext)) {
      return;
    }
    tableContext.api?.deleteEntity(ids).then((res) => {
      if (res.code === 200 && res.data) {
        Toast.success('删除成功!');
        // 触发移除后的事件
        this.eventHandler.onRemoveAfter(tableContext.props, ids);
        // 判断删除数据是否已经等于当前页的数据
        const dataSource = tableContext.dataSource;
        if (
          ids.length === dataSource.length &&
          (this.mode === 'page' || this.mode === 'cardPage')
        ) {
          let page = tableContext.table.pagination?.currentPage - 1;
          if (page < 1) {
            page = 1;
          }
          const newPagination: TablePaginationProps = {
            currentPage: page,
            pageSize: tableContext.table.pagination?.pageSize,
            total: tableContext.table.pagination?.total,
          };
          this.listOrPageOrTree(tableContext, newPagination);
        } else {
          this.listOrPageOrTree(tableContext);
        }
      } else {
        Toast.error('删除失败');
      }
    });
  }
  list(tableContext: TableContext<T>): void {
    if (check(tableContext)) {
      return;
    }
    const checkedContext = tableContext;
    tableContext.table.loading = true;
    const params: GeneralParams<T> = {
      entity: checkedContext.search as T,
      orders: checkedContext.table.orders,
    };
    checkedContext.api
      ?.list(params)
      .then((res) => {
        if (res.code === 200) {
          const data = res.data;
          checkedContext.dataSource = data as T[];
          // 触发查询后的事件
          this.eventHandler.onQueryAfter(
            tableContext.props,
            tableContext,
            undefined,
          );
        }
        checkedContext.table.loading = false;
        checkedContext.table.selectedRowKeys = [];
        checkedContext.table.pagination = false;
      })
      .catch((err) => {
        checkedContext.table.loading = false;
        checkedContext.table.selectedRowKeys = [];
        checkedContext.table.pagination = false;
      });
  }
  page(
    tableContext: TableContext<T>,
    pageable?: TablePagination | undefined,
  ): void {
    if (check(tableContext)) {
      return;
    }
    const searchPage = (pageable ||
      tableContext.table.pagination) as TablePagination;
    const page = {
      current: searchPage?.currentPage,
      size: searchPage?.pageSize,
    } as Pagination<T>;
    tableContext.table.loading = true;
    // 调用接口
    const params: GeneralParams<T> = {
      entity: tableContext.search as T,
      orders: tableContext.table.orders,
    };
    tableContext.api
      ?.page(page, params)
      .then((res) => {
        if (res.code === 200) {
          const data = res.data;
          const pageable: TablePagination = {
            currentPage: Number.parseInt(data.current),
            pageSize: Number.parseInt(data.size),
            total: Number.parseInt(data.total || '0'),
          };
          tableContext.table.loading = false;
          tableContext.table.selectedRowKeys = [];
          tableContext.table.pagination = pageable;
          tableContext.dataSource = data.records as T[];
          // 触发查询后的事件
          this.eventHandler.onQueryAfter(
            tableContext.props,
            tableContext,
            pageable,
          );
        } else {
          tableContext.table.loading = false;
          tableContext.table.selectedRowKeys = [];
        }
      })
      .catch((err) => {
        tableContext.table.loading = false;
        tableContext.table.selectedRowKeys = [];
      });
  }
  tree(tableContext: TableContext<T>): void {
    if (check(tableContext)) {
      return;
    }
    tableContext.table.loading = true;
    const params: GeneralParams<T> = {
      entity: tableContext.search as T,
    };
    (tableContext.api as TreeGeneralApi<T>)
      .tree(params)
      .then((res) => {
        if (res.code === 200) {
          tableContext.dataSource = res.data as T[];
          // 触发查询后的事件
          this.eventHandler.onQueryAfter(
            tableContext.props,
            tableContext,
            undefined,
          );
        }
        tableContext.table.loading = false;
        tableContext.table.selectedRowKeys = [];
        tableContext.table.pagination = false;
      })
      .catch((err) => {
        tableContext.table.loading = false;
        tableContext.table.selectedRowKeys = [];
        tableContext.table.pagination = false;
      });
  }
  listOrPageOrTree(
    tableContext: TableContext<T>,
    pageable?: TablePagination | undefined,
  ): void {
    if (this.mode === 'list') {
      this.list(tableContext);
    } else if (this.mode === 'page' || this.mode === 'cardPage') {
      this.page(tableContext, pageable);
    } else if (this.mode === 'tree') {
      this.tree(tableContext);
    }
  }
  details(
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    id: string,
  ): void {
    if (check(tableContext)) {
      return;
    }
    tableContext.api?.details(id).then((res) => {
      if (res.code === 200) {
        formContext.visible = true;
        formContext.type = 'details';
        formContext.values = res.data;
      }
    });
  }
  edit(
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    id: string,
  ): void {
    if (check(tableContext)) {
      return;
    }
    tableContext.api?.details(id).then((res) => {
      if (res.code === 200 && res.data) {
        formContext.visible = true;
        formContext.type = 'edit';
        formContext.values = res.data;
      }
    });
  }
  sort(tableContext: TableContext<T>, sortColumn: SortColumn): void {
    const { tableColumns } = tableContext;
    tableColumns.forEach((col) => {
      if (col.field === sortColumn.property) {
        col.sorter = sortColumn.sorted;
        col.sortOrder = sortColumn.order;
      }
    });
    const orders = tableColumns
      .filter((col) => col.sorter)
      .map((col) => {
        return {
          direction: col.sortOrder === 'ascend' ? 'ASC' : 'DESC',
          property: col.field,
        } as Order;
      });
    tableContext.table.orders = orders;
    this.listOrPageOrTree(tableContext);
  }
}
