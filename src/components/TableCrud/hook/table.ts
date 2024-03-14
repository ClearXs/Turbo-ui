import { useContext } from 'react';
import { TableCrudContext } from '../context/table';

const useTableCrudContext = () => {
  const tableContext = useContext(TableCrudContext);
  return tableContext;
};

export default useTableCrudContext;
