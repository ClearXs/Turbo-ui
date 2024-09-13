import { createContext, useContext } from 'react';
import { ListPanelContext } from '../interface';
import { Entity } from '@/api';

export const TListPanelContext = createContext<ListPanelContext<any>>(null);

export const useListPanelContext = <
  T extends Entity,
>(): ListPanelContext<T> => {
  return useContext(TListPanelContext);
};
