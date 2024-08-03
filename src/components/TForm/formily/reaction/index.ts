import { IdEntity } from '@/api';
import { RunArgs, SetFieldStateArgs } from './interface';
import { IScopeContext } from '@formily/json-schema';
import { Field } from '@formily/core';
import _, { isArray } from 'lodash';
import { getFeature, Word } from './word';
import { FormContext } from '../../interface';
import { triggerUserReactions } from './transformer';

export type ReactionFunc = (field: Field, scope: IScopeContext) => void;

export type Reaction<T extends IdEntity> = {
  // set word transform
  // like a => A...
  setWord: (
    path: keyof T,
    dependencies: (keyof T)[],
    word: Word | Word[],
  ) => ReactionFunc;
  setFieldState: (arg: SetFieldStateArgs<T>) => ReactionFunc;
  setFieldStateList: (...args: SetFieldStateArgs<T>[]) => ReactionFunc[];
  withRun: (args: RunArgs) => ReactionFunc;
};

export default function useReaction<T extends IdEntity>(): Reaction<T> {
  return {
    setWord(path, dependencies, word) {
      return this.setFieldState({
        dependencies,
        path: path as string,
        effect: (formContext, field, deps) => {
          // ignore set word if field has value
          const v = field.value;
          if (!_.isEmpty(v)) {
            return;
          }
          const sourceValue: string = deps?.[0];
          if (sourceValue == undefined) {
            return;
          }
          let targetValue: string = sourceValue;
          if (isArray(word)) {
            word
              .map(getFeature)
              .filter((f) => !_.isEmpty(f))
              .forEach((f) => (targetValue = f(targetValue)));
          } else {
            const feature = word && getFeature(word);
            if (feature) {
              targetValue = feature(targetValue);
            }
          }
          formContext.setValue(path, targetValue);
        },
      });
    },
    setFieldState({ path, dependencies, effect }) {
      if (_.isEmpty(dependencies)) {
        throw new Error('dependencies is not empty');
      }
      return (field, scope) => {
        field.form.setFieldState(path, () => {
          const $context: FormContext<T> = scope['$context'];
          const form = field.form;
          const $deps = dependencies.map((dep) => {
            return form.getValuesIn(dep as string);
          });
          effect?.($context, field, $deps);
        });
      };
    },
    setFieldStateList(...args) {
      return args.map((arg) => this.setFieldState(arg));
    },
    withRun(args) {
      return (field, scope) => {
        triggerUserReactions(field, args, scope);
      };
    },
  };
}
