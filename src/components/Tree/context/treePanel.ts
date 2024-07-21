import { createContext, useContext } from 'react';
import { TreePanelContext } from '../interface';
import { Tree } from '@/api';

export const TPanelContext = createContext<TreePanelContext<any>>(null);

export const useTreePanelContext = <T extends Tree>(): TreePanelContext<T> => {
  return useContext(TPanelContext);
};
