import { Field, Form } from '@formily/core';
import { Func, ScopeFunc } from './interface';
import { FormContext } from '../../interface';
import { useEffect } from 'react';

const RUN_SCOPE_REGISTRY = new Map<Field['path']['entire'], Func>();

export type RunScope = {
  setFieldState: (path: Field['path']['entire'], func: Func) => void;
};

const runScopeDispatch = (
  form: Form,
  field: Field,
  formContext: FormContext<any>,
  args: any[],
) => {
  const path = field.path.entire;
  const func = RUN_SCOPE_REGISTRY.get(path);
  func?.(form, field, formContext, args);
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
    setFieldState: (path, func) => {
      try {
        return `$form.setFieldState('${path}', state => $run.runScopeDispatch($form, state, $context, $deps))`;
      } finally {
        RUN_SCOPE_REGISTRY.set(path, func);
      }
    },
  };
};

export default {
  $run: {
    runScopeDispatch: runScopeDispatch,
  },
} as ScopeFunc;
