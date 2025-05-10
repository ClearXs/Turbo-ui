import {
  GeneralParams,
  Entity,
  Order,
  Pagination,
  TreeGeneralApi,
} from '@/api';
import {
  SortColumn,
  TableApi,
  TableApiEvent,
  TableApiProps,
  TableContext,
  TableCrudProps,
} from './interface';
import { Toast } from '@douyinfe/semi-ui';
import {
  TablePagination,
  TablePaginationProps,
} from '@douyinfe/semi-ui/lib/es/table';
import { FormContext } from '../uni-form/interface';

const check = <T extends Entity>(tableContext: TableContext<T>) => {
  if (tableContext === undefined) {
    Toast.error('未完成初始化!');
    return true;
  }
  if (tableContext.api === undefined) {
    return true;
  }
  if (tableContext.props.operability === false) {
    return true;
  }
  return false;
};

type EventHandler<T extends Entity> = {
  onRemoveAfter: (props: TableCrudProps<T>, ids: T['id'][]) => void;
  onQueryAfter: (props: TableCrudProps<T>, pageable?: TablePagination) => void;
};

class EventHandlerImpl<T extends Entity> implements EventHandler<T> {
  constructor(private tableContext: TableContext<T>) {}

  onRemoveAfter(props: TableCrudProps<T>, ids: T['id'][]) {
    const { event } = props;
    try {
      event?.onDeleteSuccess?.(ids);
    } catch (err) {
      console.error(err);
    }
  }
  onQueryAfter(props: TableCrudProps<T>, pageable?: TablePagination) {
    const { event } = props;
    try {
      event?.onQuerySuccess?.(this.tableContext, pageable);
    } catch (err) {
      console.error(err);
    }
  }
}

export class DefaultTableApi<T extends Entity> implements TableApi<T> {
  eventHandler: EventHandler<T>;

  constructor(
    private tableContext: TableContext<T>,
    private mode: TableCrudProps<T>['mode'],
    private formContext?: FormContext<T>,
  ) {
    this.eventHandler = new EventHandlerImpl<T>(tableContext);
  }

  saveOrUpdate(entity: T, props?: TableApiProps, event?: TableApiEvent): void {
    const helperApi = this.tableContext.helperApi;
    const id = this.tableContext.helperApi.getId(entity);
    const dataSource = this.tableContext.dataSource;
    if (id) {
      dataSource.push(entity);
    } else {
      const index = helperApi.index(id);
      dataSource[index] = entity;
    }
    event?.onSuccess?.();
  }

  inlineEdit(id: string, props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext?.inlineEditorApi.open(id);
    event?.onSuccess?.();
  }

  remove(ids: string[], props?: TableApiProps, event?: TableApiEvent): void {
    const helperApi = this.tableContext.helperApi;
    for (const id of ids) {
      const dataSource = this.tableContext.dataSource;
      const index = helperApi.index(id);
      this.tableContext.dataSource = [
        ...dataSource.slice(0, index),
        ...dataSource.slice(index + 1),
      ];
    }
    event?.onSuccess?.();
  }

  list(props?: TableApiProps, event?: TableApiEvent): void {
    event?.onSuccess?.();
  }
  page(
    pageable?: TablePagination,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void {
    event?.onSuccess?.();
  }
  tree(props?: TableApiProps, event?: TableApiEvent): void {
    event?.onSuccess?.();
  }
  listOrPageOrTree(
    pageable?: TablePagination,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void {
    if (this.mode === 'list') {
      this.list(props, event);
    } else if (this.mode === 'page' || this.mode === 'cardPage') {
      this.page(pageable, props, event);
    } else if (this.mode === 'tree') {
      this.tree(props, event);
    }
  }

  details(id: string, props?: TableApiProps, event?: TableApiEvent): void {
    const { idKey, dataSource } = this.tableContext;
    const value = dataSource.find((data) => data[idKey] === id);
    this.formContext!.visible = true;
    this.formContext!.type = 'details';
    this.formContext!.setValues(value!);

    event?.onSuccess?.();
  }

  edit(id: string, props?: TableApiProps, event?: TableApiEvent): void {
    const { idKey, dataSource } = this.tableContext;
    const value = dataSource.find((data) => data[idKey] === id);
    this.formContext!.visible = true;
    this.formContext!.type = 'edit';
    this.formContext!.setValues(value!);
    event?.onSuccess?.();
  }

  sort(
    sortColumn: SortColumn,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void {
    // nothing
  }

  setTableContext(tableContext: TableContext<T>): void {
    this.tableContext = tableContext;
  }
  setFormContext(fromContext: FormContext<T>): void {
    this.formContext = fromContext;
  }
}

/**
 * base on remote invoke.
 */
export class RemoteTableApi<T extends Entity> implements TableApi<T> {
  eventHandler: EventHandler<T>;

  constructor(
    private tableContext: TableContext<T>,
    private mode: TableCrudProps<T>['mode'],
    private formContext?: FormContext<T>,
  ) {
    this.eventHandler = new EventHandlerImpl<T>(tableContext);
  }

  saveOrUpdate(entity: T, props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.api
      ?.saveOrUpdate(entity)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200 && data) {
          (props?.showMessage || true) && Toast.success('保存成功!');
          event?.onSuccess?.();
        } else {
          (props?.showMessage || true) && Toast.error(message);
          event?.onError?.(new Error(message));
        }
      })
      .catch((err) => {
        event?.onError?.(err);
      });
  }

  inlineEdit(id: string, props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.inlineEditorApi.open(id);
    event?.onSuccess?.();
  }

  remove(ids: string[], props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.api
      ?.deleteEntity(ids)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200 && data) {
          (props?.showMessage || true) && Toast.success('删除成功!');
          // 触发移除后的事件
          this.eventHandler.onRemoveAfter(this.tableContext.props, ids);
          // 判断删除数据是否已经等于当前页的数据
          const dataSource = this.tableContext.dataSource;
          if (
            ids.length === dataSource.length &&
            (this.mode === 'page' || this.mode === 'cardPage')
          ) {
            let page = this.tableContext.table.pagination?.currentPage - 1;
            if (page < 1) {
              page = 1;
            }
            const newPagination: TablePaginationProps = {
              currentPage: page,
              pageSize: this.tableContext.table.pagination?.pageSize,
              total: this.tableContext.table.pagination?.total,
            };
            this.listOrPageOrTree(newPagination);
          } else {
            this.listOrPageOrTree();
          }
          event?.onSuccess?.();
        } else {
          (props?.showMessage || true) && Toast.error(message);
          event?.onError?.(new Error(message));
        }
      })
      .catch((err) => event?.onError?.(err));
  }

  list(props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.table.loading = true;
    const params: GeneralParams<T> = {
      entity: this.tableContext.search as T,
      orders: this.tableContext.table.orders,
    };
    this.tableContext.api
      ?.list(params)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          this.tableContext.dataSource = data as T[];
          this.eventHandler.onQueryAfter(this.tableContext.props, undefined);
          event?.onSuccess?.();
        } else {
          event?.onError?.(new Error(message));
        }
        this.tableContext.table.loading = false;
        this.tableContext.table.selectedRowKeys = [];
        this.tableContext.table.pagination = false;
      })
      .catch((err) => {
        this.tableContext.table.loading = false;
        this.tableContext.table.selectedRowKeys = [];
        this.tableContext.table.pagination = false;
        event?.onError?.(err);
      });
  }

  page(
    pageable?: TablePagination,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void {
    const searchPage = (pageable ||
      this.tableContext.table.pagination) as TablePagination;
    const page = {
      current: searchPage?.currentPage,
      size: searchPage?.pageSize,
    } as Pagination<T>;
    this.tableContext.table.loading = true;
    // 调用接口
    const params: GeneralParams<T> = {
      entity: this.tableContext.search as T,
      orders: this.tableContext.table.orders,
    };
    this.tableContext.api
      ?.page(page, params)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          const pageable: TablePagination = {
            currentPage: Number.parseInt(data.current),
            pageSize: Number.parseInt(data.size),
            total: Number.parseInt(data.total || '0'),
          };
          this.tableContext.table.loading = false;
          this.tableContext.table.selectedRowKeys = [];
          this.tableContext.table.pagination = pageable;
          this.tableContext.dataSource = data.records as T[];
          this.eventHandler.onQueryAfter(this.tableContext.props, pageable);
          event?.onSuccess?.();
        } else {
          event?.onError?.(new Error(message));
          this.tableContext.table.loading = false;
          this.tableContext.table.selectedRowKeys = [];
        }
      })
      .catch((err) => {
        event?.onError?.(err);
        this.tableContext.table.loading = false;
        this.tableContext.table.selectedRowKeys = [];
      });
  }

  tree(props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.table.loading = true;
    const params: GeneralParams<T> = {
      entity: this.tableContext.search as T,
    };
    (this.tableContext.api as TreeGeneralApi<T>)
      .tree(params)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          this.tableContext.dataSource = data;
          this.eventHandler.onQueryAfter(this.tableContext.props, undefined);
          event?.onSuccess?.();
        } else {
          event?.onError?.(new Error(message));
        }
        this.tableContext.table.loading = false;
        this.tableContext.table.selectedRowKeys = [];
        this.tableContext.table.pagination = false;
      })
      .catch((err) => {
        this.tableContext.table.loading = false;
        this.tableContext.table.selectedRowKeys = [];
        this.tableContext.table.pagination = false;
      });
  }

  listOrPageOrTree(
    pageable?: TablePagination,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void {
    if (this.mode === 'list') {
      this.list(props, event);
    } else if (this.mode === 'page' || this.mode === 'cardPage') {
      this.page(pageable, props, event);
    } else if (this.mode === 'tree') {
      this.tree(props, event);
    }
  }

  details(id: string, props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.api
      ?.details(id)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          this.formContext!.visible = true;
          this.formContext!.type = 'details';
          this.formContext!.setValues(data);
          event?.onSuccess?.();
        } else {
          event?.onError?.(new Error(message));
        }
      })
      .catch((err) => event?.onError?.(err));
  }

  edit(id: string, props?: TableApiProps, event?: TableApiEvent): void {
    this.tableContext.api
      ?.details(id)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200 && data) {
          this.formContext!.visible = true;
          this.formContext!.type = 'edit';
          this.formContext!.setValues(data);
          event?.onSuccess?.();
        } else {
          event?.onError?.(new Error(message));
        }
      })
      .catch((err) => event?.onError?.(err));
  }

  sort(
    sortColumn: SortColumn,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void {
    const { tableColumns } = this.tableContext;
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
    this.tableContext.table.orders = orders;
    this.listOrPageOrTree();
  }

  setTableContext(tableContext: TableContext<T>): void {
    if (tableContext === undefined || check(tableContext)) {
      throw new Error('not finish initialization.');
    }
    this.tableContext = tableContext;
  }

  setFormContext(fromContext: FormContext<T>): void {
    this.formContext = fromContext;
  }
}
