import { useContext } from 'react';
import { TFormContext } from '../context/form';

const useFormContext = () => {
  const formContext = useContext(TFormContext);
  return formContext;
};

export default useFormContext;
