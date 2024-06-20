import { Field, Form } from '@formily/core';
import { FormContext } from '../../interface';
import { IdEntity } from '@/api';

export type Func<T extends IdEntity = IdEntity, Value = any> = (
  form: Form,
  field: Field,
  formContext: FormContext<T>,
  deps?: Value[],
) => void;

export type ScopeFunc = {
  [key: string]: {
    [key: string]: Func;
  };
};

export type SetFieldStateArgs<T extends IdEntity = IdEntity, Value = any> = {
  // set field state path
  path: Field['path']['entire'];
  func: Func<T, Value>;
};
