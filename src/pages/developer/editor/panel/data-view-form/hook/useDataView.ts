import { useContext } from 'react';
import { DataViewContext } from '../context/dataView';
import { DataView } from '../../../kernel';

const useDataView = () => {
  const dataView = useContext<DataView>(DataViewContext);
  return dataView;
};

export default useDataView;
