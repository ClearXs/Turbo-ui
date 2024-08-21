import { IdEntity } from '@/api';
import { ListPanelContext } from './interface';
import { FormContext } from '../tform/interface';
import { action, define, observable } from '@formily/reactive';

export default class ListPanelContextImpl<T extends IdEntity>
  implements ListPanelContext<T>
{
  props: ListPanelContext<T>['props'];
  loading: ListPanelContext<T>['loading'];
  list: ListPanelContext<T>['list'];
  dataSource: ListPanelContext<T>['dataSource'];
  selectKey: ListPanelContext<T>['selectKey'];
  selectKeys: ListPanelContext<T>['selectKeys'];
  formContext: FormContext<T> | undefined;

  constructor(props: ListPanelContext<T>['props']) {
    this.props = props;
    this.loading = false;
    this.list = [];
    this.dataSource = [];
    this.selectKey = '';
    this.selectKeys = [];

    define(this, {
      loading: observable,
      list: observable,
      dataSource: observable,
      selectKey: observable,
      selectKeys: observable,
      setFormContext: action,
    });
  }
  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
  }
}
