import { Field, Form } from '@formily/core';
import { FormContext } from '../../interface';

export type Func = (
  form: Form,
  field: Field,
  formContext: FormContext<any>,
  args: any[],
) => void;

export type ScopeFunc = {
  [key: string]: {
    [key: string]: Func;
  };
};
