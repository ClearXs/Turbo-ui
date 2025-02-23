import { Tree } from '@/api';
import { TreePanelContext, TreePanelProps } from './interface';
import { action, makeObservable, observable } from 'mobx';
import { FormContext } from '../uni-form/interface';

export default class TreePanelContextImpl<T extends Tree>
  implements TreePanelContext<T>
{
  props: TreePanelContext<T>['props'];
  loading: TreePanelContext<T>['loading'];
  selectKey: TreePanelContext<T>['selectKey'];
  selectKeys: TreePanelContext<T>['selectKeys'];
  dataSource: TreePanelContext<T>['dataSource'];
  allKeys: TreePanelContext<T>['allKeys'];
  formContext: FormContext<T> | undefined;

  constructor(props: TreePanelProps<T>) {
    this.props = props;
    this.loading = false;
    this.selectKey = '';
    this.selectKeys = [];
    this.dataSource = [];
    this.allKeys = [];

    makeObservable(this, {
      loading: observable,
      selectKey: observable,
      selectKeys: observable,
      dataSource: observable,
      allKeys: observable,
      formContext: observable,
      setFormContext: action,
    });
  }
  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
  }
}
