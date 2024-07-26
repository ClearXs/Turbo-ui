import { IdEntity } from '@/api';
import FormContextImpl from '../FormContext';
import { FormilyFormContext } from './interface';
import { Form } from '@formily/core';
import FormContext from '../FormContext';
import { action, define } from '@formily/reactive';

export default class FormilyFormContextImpl<T extends IdEntity>
  extends FormContextImpl<T>
  implements FormilyFormContext<T>
{
  coreForm: Form<T>;

  constructor(props: FormContext<T>['props'], coreForm: Form<T>) {
    super(props);
    this.coreForm = coreForm;
    this.coreForm.setInitialValues(this.getDefaultValues());
    define(this, {
      setCoreForm: action,
    });

    this.validate = (pattern: any) => {
      this.coreForm.validate(pattern);
    };

    this.submit = (onSubmit: any) => {
      this.coreForm.submit(onSubmit);
    };

    this.reset = (pattern, options) => {
      this.coreForm.reset(pattern, options);
    };
  }

  getValue(field: keyof T): any {
    return this.coreForm.getValuesIn(field);
  }

  getValues(): Partial<T> {
    return this.coreForm.values || {};
  }

  setValue(field: keyof T, value: any): void {
    this.coreForm.setValuesIn(field, value);
  }

  setValues(values: Partial<T>): void {
    const inValues: Partial<T> = {};
    for (const field in values) {
      const v = values[field];
      const column = this.getColumn(field);
      if (column) {
        const inValue = this.decorator
          .getField(column!)
          ?.getValueHandler()
          .toInValue(v);

        inValues[field] = inValue;
      } else {
        inValues[field] = v;
      }
    }
    this.coreForm.values = inValues;
  }

  setCoreForm(coreForm: Form<T>): void {
    this.valid = coreForm.valid;
    this.validating = coreForm.validating;
    this.coreForm = coreForm;
  }
}
