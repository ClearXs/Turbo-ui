import { TableContext } from '@/components/TableCrud/TableCrud';
import { atom } from 'recoil';

const namespace = 'table';
export const TableContextState = atom<TableContext | undefined>({
  key: `${namespace}:context`,
  default: undefined,
});
