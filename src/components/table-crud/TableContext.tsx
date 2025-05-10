import { GeneralApi, Entity } from '@/api';

import {
  HelperApi,
  InlineEditorApi,
  TableApi,
  TableColumnProps,
  TableContext,
  TableCrudProps,
} from './interface';
import { getTableDecorator } from './table';
import { action, makeObservable, observable } from 'mobx';
import HelperApiImpl from './HelperApi';
import { DefaultTableApi, RemoteTableApi } from './TableApi';
import InlineEditorApiImpl from './InlineEditorApi';
import TableColumnsBuilder from './TableColumnBuilder';
import { FormContext } from '../uni-form/interface';
import { TablePagination } from '@douyinfe/semi-ui/lib/es/table';

export default class TableContextImpl<T extends Entity>
  implements TableContext<T>
{
  idKey: TableContext<T>['idKey'];
  props: TableContext<T>['props'];
  mode: TableContext<T>['mode'];
  api: TableContext<T>['api'];
  inlineEditor: TableContext<T>['inlineEditor'];
  tableApi: TableApi<T>;
  inlineEditorApi: InlineEditorApi<T>;
  helperApi: HelperApi<T>;
  tableColumns: TableContext<T>['tableColumns'];
  search: TableContext<T>['search'];
  table: TableContext<T>['table'];
  tree: TableContext<T>['tree'];
  dataSource: TableContext<T>['dataSource'];
  decorator: TableContext<T>['decorator'];
  formContext?: FormContext<T>;
  fixed: boolean;

  constructor(props: TableCrudProps<T>, api: GeneralApi<T>) {
    const {
      id = 'id',
      mode,
      columns = [],
      expandAllRows,
      params = {},
      dataSource = [],
      fixed = false,
    } = props;

    this.fixed = fixed;
    this.api = api;
    const pageable: TablePagination =
      mode === 'page'
        ? {
            currentPage: 1,
            pageSize: 10,
            pageSizeOpts: [10, 20],
            showSizeChanger: true,
            showQuickJumper: true,
          }
        : false;

    this.idKey = id;
    this.mode = mode;
    this.tableColumns = columns;
    this.props = props;
    this.table = {
      loading: false,
      pagination: pageable,
      selectedRowKeys: [],
    };
    this.tree = {
      expandAllRows: expandAllRows,
    };
    this.search = params;
    this.inlineEditor = {
      modCount: 0,
      editing: new Map(),
    };
    this.dataSource = dataSource;
    this.decorator = getTableDecorator<T>();
    this.tableApi =
      this.api === undefined
        ? new DefaultTableApi<T>(this, this.mode)
        : new RemoteTableApi<T>(this, this.mode);
    this.tableApi.setTableContext(this);
    this.helperApi = new HelperApiImpl<T>(this);
    this.inlineEditorApi = new InlineEditorApiImpl<T>(this);

    this.decorator.setTableContext(this);

    makeObservable(this, {
      idKey: observable,
      mode: observable,
      inlineEditor: observable,
      tableColumns: observable,
      search: observable,
      tree: observable,
      table: observable,
      dataSource: observable,
      refresh: action,
      getTableColumns: action,
      setTableColumns: action,
      getSelectedRows: action,
      getSelectedRowKeys: action,
      setFormContext: action,
    });
  }

  refresh(): void {
    this.tableApi.listOrPageOrTree(this.table.pagination);
  }

  getTableColumns(
    exclusiveOperate?: boolean,
    immediateFilter?: boolean,
  ): TableColumnProps<T>[] {
    return new TableColumnsBuilder(this.tableColumns || [], this)
      .sync()
      .build(exclusiveOperate, immediateFilter, this.fixed);
  }

  setTableColumns(columns: TableColumnProps<T>[]): void {
    this.tableColumns = columns;
  }

  getSelectedRowKeys(): string[] {
    return this.table.selectedRowKeys;
  }

  getSelectedRows(): T[] {
    const selectedRowKeys = this.table.selectedRowKeys;
    const dataSource = this.dataSource;
    return dataSource.filter((r) => selectedRowKeys.includes(r[this.idKey]));
  }

  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
    // set table api
    this.tableApi.setFormContext(formContext);
  }
}
