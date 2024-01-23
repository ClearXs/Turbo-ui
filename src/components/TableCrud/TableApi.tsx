import {
  GeneralParams,
  IdEntity,
  Order,
  Pagination,
  TreeGeneralApi,
} from '@/api/interface';
import { TableApi, TableContext, TableCrudProps } from './interface';
import { useMemo } from 'react';
import { Notification } from '@douyinfe/semi-ui';
import {
  TablePagination,
  TablePaginationProps,
} from '@douyinfe/semi-ui/lib/es/table';

export default function useTableApi<T extends IdEntity>(
  mode: TableCrudProps<T>['mode'],
) {
  return useMemo<TableApi<T>>(() => {
    const check = (tableContext: TableContext<T>) => {
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
            // 判断删除数据是否已经等于当前页的数据
            const dataSource = tableContext.dataSource;
            if (
              ids.length === dataSource.length &&
              (mode === 'page' || mode === 'cardPage')
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
        tableContext.api.page(page, params).then((res) => {
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
          } else {
            tableContext.table.loading = false;
            tableContext.table.selectedRowKeys = [];
          }
        });
      },
      list(tableContext: TableContext<T>) {
        if (check(tableContext)) {
          return;
        }
        const checkedContext = tableContext;
        tableContext.table.loading = true;

        const params: GeneralParams<T> = {
          entity: checkedContext.search as T,
          orders: checkedContext.table.orders,
        };
        checkedContext.api?.list(params).then((res) => {
          if (res.code === 200) {
            const data = res.data;
            checkedContext.dataSource = data as T[];
          }
          checkedContext.table.loading = false;
          checkedContext.table.selectedRowKeys = [];
          checkedContext.table.pagination = false;
        });
      },
      tree(tableContext: TableContext<T>) {
        if (check(tableContext)) {
          return;
        }
        tableContext.table.loading = true;
        const params: GeneralParams<T> = {
          entity: tableContext.search as T,
        };
        (tableContext.api as TreeGeneralApi<T>).tree(params).then((res) => {
          if (res.code === 200) {
            tableContext.dataSource = res.data as T[];
          }
          tableContext.table.loading = false;
          tableContext.table.selectedRowKeys = [];
          tableContext.table.pagination = false;
        });
      },
      listOrPageOrTree(tableContext, pageable?) {
        if (mode === 'list') {
          this.list(tableContext);
        } else if (mode === 'page' || mode === 'cardPage') {
          this.page(tableContext, pageable);
        } else if (mode === 'tree') {
          this.tree(tableContext);
        }
      },
      edit(tableContext, formContext, id) {
        if (check(tableContext)) {
          return;
        }
        tableContext.api.details(id).then((res) => {
          if (res.code === 200 && res.data) {
            formContext.visible = true;
            formContext.type = 'edit';
            formContext.values = res.data;
          } else {
            Notification.error({ position: 'top', content: res.message });
          }
        });
      },
      details(tableContext, formContext, id: string) {
        if (check(tableContext)) {
          return;
        }
        tableContext.api.details(id).then((res) => {
          if (res.code === 200) {
            formContext.visible = true;
            formContext.type = 'details';
            formContext.values = res.data;
          } else {
            Notification.error({ position: 'top', content: res.message });
          }
        });
      },
      sort(tableContext, sortColumn) {
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
      },
      switchMode(tableContext, value) {
        tableContext.mode = value;
      },
    };
  }, []);
}
