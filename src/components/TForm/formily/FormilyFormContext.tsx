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
  coreForm?: Form<T>;

  constructor(props: FormContext<T>['props']) {
    super(props);
    define(this, {
      setCoreForm: action,
    });
  }

  getValue(field: keyof T): any {
    return this.coreForm!.getValuesIn(field);
  }

  getValues(): Partial<T> {
    return this.coreForm!.values;
  }

  setValue(field: keyof T, value: any): void {
    this.coreForm!.setValuesIn(field, value);
  }

  setValues(values: Partial<T>): void {
    this.coreForm!.setValues(values);
  }

  setCoreForm(coreForm: Form<T>): void {
    this.valid = coreForm.valid;
    this.validating = coreForm.validating;
    this.coreForm = coreForm;
  }
}
