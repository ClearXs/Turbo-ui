import { createContext } from 'react';
import { TableContext } from './interface';

export const TableCrudContext = createContext<TableContext<any>>(undefined);
