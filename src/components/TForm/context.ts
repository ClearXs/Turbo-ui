import { createContext } from 'react';
import { FormContext } from './interface';

export const TFormContext = createContext<FormContext<any>>(null);
