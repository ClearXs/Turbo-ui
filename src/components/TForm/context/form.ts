import { createContext, useContext } from 'react';
import { FormContext } from '../interface';
import { IdEntity } from '@/api';

export const TFormContext = createContext<FormContext<any>>(null);

export const useTFormContext = <T extends IdEntity>(): FormContext<T> => {
  return useContext(TFormContext);
};
