import { untracked, autorun, observable } from '@formily/reactive';
import {
  isArr,
  isStr,
  each,
  isPlainObj,
  reduce,
  lazyMerge,
} from '@formily/shared';
import { ISchemaTransformerOptions } from '@formily/json-schema';
import {
  onFieldInit,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFieldInputValueChange,
  onFieldInitialValueChange,
  onFieldValidateStart,
  onFieldValidateEnd,
  onFieldValidateFailed,
  onFieldValidateSuccess,
  Field,
} from '@formily/core';
import { RunArgs } from './interface';

const FieldEffects = {
  onFieldInit,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFieldInputValueChange,
  onFieldInitialValueChange,
  onFieldValidateStart,
  onFieldValidateEnd,
  onFieldValidateFailed,
  onFieldValidateSuccess,
};

const DefaultFieldEffects = ['onFieldInit', 'onFieldValueChange'];

const getDependencyValue = (
  field: Field,
  pattern: string,
  property?: string,
) => {
  const [target, path] = String(pattern).split(/\s*#\s*/);
  return field.query(target).getIn(path || property || 'value');
};

const getDependencies = (
  field: Field,
  dependencies:
    | Array<string | { name?: string; source?: string; property?: string }>
    | object,
) => {
  if (isArr(dependencies)) {
    const results = [];
    dependencies.forEach((pattern) => {
      if (isStr(pattern)) {
        results.push(getDependencyValue(field, pattern));
      } else if (isPlainObj(pattern)) {
        if (pattern.name && pattern.source) {
          results[pattern.name] = getDependencyValue(
            field,
            pattern.source,
            pattern.property,
          );
        }
      }
    });
    return results;
  } else if (isPlainObj(dependencies)) {
    return reduce(
      dependencies,
      (buf, pattern, key) => {
        buf[key] = getDependencyValue(field, pattern);
        return buf;
      },
      {},
    );
  }
  return [];
};

const getBaseScope = (
  field: Field,
  options: ISchemaTransformerOptions = {},
) => {
  const $observable = (target: any, deps?: any[]) =>
    autorun.memo(() => observable(target), deps);
  const $props = (props: any) => field.setComponentProps(props);
  const $effect = autorun.effect;
  const $memo = autorun.memo;
  const $self = field;
  const $form = field.form;
  const $values = field.form.values;
  return lazyMerge(
    {
      get $lookup() {
        return options?.scope?.$record ?? $values;
      },
      get $records() {
        return field.records;
      },
      get $record() {
        const record = field.record;
        if (typeof record === 'object') {
          return lazyMerge(record, {
            get $lookup() {
              return options?.scope?.$record ?? $values;
            },
            get $index() {
              return field.index;
            },
          });
        }
        return record;
      },
      get $index() {
        return field.index;
      },
    },
    options.scope,
    {
      $form,
      $self,
      $observable,
      $effect,
      $memo,
      $props,
      $values,
    },
  );
};

export const triggerUserReactions = (
  field: Field,
  args: RunArgs,
  options?: ISchemaTransformerOptions,
) => {
  const { target, effects, fulfill } = args;
  const run = () => {
    const $target = field.form.getFieldState(target);
    const baseScope = getBaseScope(field, options);
    const $deps = getDependencies(field, args.dependencies);
    fulfill?.(field, $target, $deps, baseScope);
  };
  if (target) {
    args.effects = effects?.length ? effects : DefaultFieldEffects;
  }
  if (args.effects) {
    autorun.memo(() => {
      untracked(() => {
        each(args.effects, (type) => {
          if (FieldEffects[type]) {
            FieldEffects[type](target, run);
          }
        });
      });
    }, []);
  } else {
    run();
  }
};
