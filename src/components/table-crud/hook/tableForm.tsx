import useTableCrudContext from './table';

const useTableFormContext = () => {
  const tableContext = useTableCrudContext();
  return tableContext?.formContext;
};

export default useTableFormContext;
