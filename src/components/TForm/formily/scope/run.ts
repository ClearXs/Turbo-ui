import { Field, Form } from '@formily/core';
import { Func, ScopeFunc, SetFieldStateArgs } from './interface';
import { FormContext } from '../../interface';
import { useEffect } from 'react';

const RUN_SCOPE_REGISTRY = new Map<Field['path']['entire'], Func<any, any>>();

export type RunScope = {
  setFieldState: ({ path, func }: SetFieldStateArgs) => string;
  setFieldStateList: (...args: SetFieldStateArgs[]) => string;
};

const runScopeDispatch = (
  form: Form,
  field: Field,
  formContext: FormContext<any>,
  deps: any[],
) => {
  const path = field.path.entire;
  const func = RUN_SCOPE_REGISTRY.get(path);
  func?.(form, field, formContext, deps);
};

/**
 *
 * @param bizKey
 */
export const useRunScope = (): RunScope => {
  useEffect(() => {
    return () => {
      RUN_SCOPE_REGISTRY.clear();
    };
  }, []);

  return {
    /**
     * run the $form.setFieldState() script, when @code path callback, will be invoke @code func
     *
     * @param path the field path
     * @param func the callback func
     * @returns void
     */
    setFieldState: ({ path, func }) => {
      try {
        return `$form.setFieldState('${path}', field => {\n if (field.path?.entire === '${path}') $run.runScopeDispatch($form, field, $context, $deps) \n } );`;
      } finally {
        RUN_SCOPE_REGISTRY.set(path, func);
      }
    },
    setFieldStateList(...args) {
      return args.reduce((p, c, index) => {
        if (index === 0) {
          return this.setFieldState(c);
        }
        return p + '\n' + this.setFieldState(c);
      }, '');
    },
  };
};

export default {
  $run: {
    runScopeDispatch: runScopeDispatch,
  },
} as ScopeFunc;
