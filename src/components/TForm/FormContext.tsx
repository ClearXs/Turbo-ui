import { IdEntity } from '@/api';
import { FormColumnProps, FormContext } from './interface';
import { getFormColumnDecorator } from '.';
import { action, define, observable } from '@formily/reactive';
import _ from 'lodash';
import { Constant } from '@/constant';

const formTypeList: Record<string, Constant> = {
  add: {
    value: 'add',
    label: '添加',
  },
  edit: {
    value: 'edit',
    label: '编辑',
  },
  details: {
    value: 'details',
    label: '明细',
  },
};

export default class FormContextImpl<T extends IdEntity>
  implements FormContext<T>
{
  title: FormContext<T>['title'];
  icon: FormContext<T>['icon'];
  type: FormContext<T>['type'];
  props: FormContext<T>['props'];
  visible: FormContext<T>['visible'];
  loading: FormContext<T>['loading'];
  columns: FormContext<T>['columns'];
  values?: FormContext<T>['values'];
  dataSet: FormContext<T>['dataSet'];
  decorator: FormContext<T>['decorator'];
  valid: FormContext<T>['valid'];
  validating: FormContext<T>['validating'];
  validate?: FormContext<T>['validate'];
  submit?: FormContext<T>['submit'];
  reset?: FormContext<T>['reset'];
  formValues: Partial<T>;

  constructor(props: FormContext<T>['props']) {
    this.type = props.type || 'add';
    this.props = props;
    this.visible = props.immediateVisible || false;
    this.loading = false;
    this.decorator = props.decorator || getFormColumnDecorator(this);
    this.decorator.setFormContext(this);
    this.dataSet = {};
    this.valid = false;
    this.validating = false;
    const formType = formTypeList[this.type || 'add'];
    this.title = props.title || formType.label;
    this.icon = formType.icon;
    this.formValues = {};
    this.columns =
      props.columns.filter((column) => {
        let showForm;
        if (typeof column.form === 'function') {
          showForm = column.form(this);
        } else {
          showForm = column.form;
        }
        return column.type !== 'undefined' && showForm !== false;
      }) || [];

    define(this, {
      type: observable,
      visible: observable,
      loading: observable,
      dataSet: observable,
      valid: observable,
      validating: observable,
      columns: observable,
      formValues: observable,
      getDefaultValues: action,
      getValue: action,
      getValues: action,
      setValue: action,
      setValues: action,
      open: action,
      close: action,
    });
  }

  getDefaultValues(): Partial<T> {
    // 1.父级传递的params
    // 2.column上默认值
    const columnValues = this.columns
      .filter((column) => column.initValue !== undefined)
      .reduce(
        (pre, cur) => {
          pre[cur.field] = cur.initValue;
          return pre;
        },
        {} as Record<string, any>,
      );
    return Object.assign({}, this.props.params, columnValues);
  }

  getValue(field: keyof T): any {
    return this.formValues[field];
  }

  getValues(): Partial<T> {
    return this.formValues;
  }

  setValue(field: keyof T, value: any): void {
    this.formValues[field] = value;
  }

  setValues(values: Partial<T>): void {
    this.formValues = { ...this.formValues, ...values };
  }

  getColumn(field: keyof T): FormColumnProps<T> | undefined {
    const paths = field.split('.');
    return this.retrieveColumn(paths, 0, this.columns);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  private retrieveColumn(
    paths: string[],
    deep: number,
    columns: FormColumnProps<T>[],
  ): FormColumnProps<T> | undefined {
    if (_.isEmpty(columns) || deep >= paths.length) {
      return undefined;
    }
    let children: FormColumnProps<T>[] = [];
    const path = paths[deep];

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.field === path) {
        return column;
      }
      if (column.type === 'jsonObject' || column.type === 'jsonArray') {
        children = [...children, ...(column['columns'] || [])];
      }
    }
    return this.retrieveColumn(paths, deep, children);
  }
}
