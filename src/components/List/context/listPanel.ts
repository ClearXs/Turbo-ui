import { createContext, useContext } from 'react';
import { ListPanelContext } from '../interface';
import { IdEntity } from '@/api';

export const TListPanelContext = createContext<ListPanelContext<any>>(null);

export const useListPanelContext = <
  T extends IdEntity,
>(): ListPanelContext<T> => {
  return useContext(TListPanelContext);
};
