import { createContext, useContext } from 'react';
import { FormContext } from '../interface';
import { Entity } from '@/api';

export const UniFormContext = createContext<FormContext<any>>(null);

export const useUniFormContext = <T extends Entity>(): FormContext<T> => {
  return useContext(UniFormContext);
};
