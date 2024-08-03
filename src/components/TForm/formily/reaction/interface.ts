import { Field } from '@formily/core';
import { FormContext } from '../../interface';
import { IdEntity } from '@/api';
import { IScopeContext, SchemaEffectTypes } from '@formily/json-schema';

export type Effect<T extends IdEntity = IdEntity, Value = any> = (
  formContext: FormContext<T>,
  field: Field,
  deps?: Value[],
) => void;

export type SetFieldStateArgs<T extends IdEntity = IdEntity, Value = any> = {
  // set field state path
  path: Field['path']['entire'];
  // dependencies
  dependencies: Dependent<T>[];
  // effect
  effect: Effect<T, Value>;
};

export type Dependent<T extends IdEntity = any> =
  | keyof T
  | {
      path: string;
      effect: SchemaEffectTypes[];
    };

export type RunArgs = {
  target: string;
  dependencies?:
    | Array<
        | string
        | {
            name?: string;
            type?: string;
            source?: string;
            property?: string;
          }
      >
    | Record<string, string>;
  effects?: (SchemaEffectTypes | (string & {}))[];
  fulfill: (
    $self: Field,
    $target: Field,
    $deps: Record<string, any>,
    $scope: IScopeContext,
  ) => void;
};
