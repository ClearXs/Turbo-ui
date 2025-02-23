import { useContext } from 'react';
import { UniFormContext } from '../context/form';

const useFormContext = () => {
  const formContext = useContext(UniFormContext);
  return formContext;
};

export default useFormContext;
