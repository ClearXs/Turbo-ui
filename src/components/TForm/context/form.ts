import { createContext, useContext } from 'react';
import { FormContext } from '../interface';
import { Entity } from '@/api';

export const TFormContext = createContext<FormContext<any>>(null);

export const useTFormContext = <T extends Entity>(): FormContext<T> => {
  return useContext(TFormContext);
};
