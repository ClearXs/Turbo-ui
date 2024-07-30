import { Field, Form } from '@formily/core';
import { FormContext } from '../../interface';
import { IdEntity } from '@/api';

export type Effect<T extends IdEntity = IdEntity, Value = any> = (
  formContext: FormContext<T>,
  field: Field,
  deps?: Value[],
) => void;

export type SetFieldStateArgs<T extends IdEntity = IdEntity, Value = any> = {
  // set field state path
  path: Field['path']['entire'];
  // dependencies
  dependencies: (keyof T)[];
  // effect
  effect: Effect<T, Value>;
};
