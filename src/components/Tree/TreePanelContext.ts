import { Tree } from '@/api';
import { TreePanelContext, TreePanelProps } from './interface';
import { action, define, observable } from '@formily/reactive';
import { FormContext } from '../TForm/interface';

export default class TreePanelContextImpl<T extends Tree>
  implements TreePanelContext<T>
{
  props: TreePanelContext<T>['props'];
  loading: TreePanelContext<T>['loading'];
  tree: TreePanelContext<T>['tree'];
  selectKey: TreePanelContext<T>['selectKey'];
  selectKeys: TreePanelContext<T>['selectKeys'];
  dataSource: TreePanelContext<T>['dataSource'];
  allKeys: TreePanelContext<T>['allKeys'];
  formContext: FormContext<T> | undefined;

  constructor(props: TreePanelProps<T>) {
    this.props = props;
    this.loading = false;
    this.tree = [];
    this.selectKey = '';
    this.selectKeys = [];
    this.dataSource = [];
    this.allKeys = [];

    define(this, {
      loading: observable,
      tree: observable,
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
