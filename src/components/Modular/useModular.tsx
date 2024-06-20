import { useContext } from 'react';
import { ModularProps } from './interface';
import ModularContext from './context';

export type ModularReturnHooksType = {
  destroy: () => void;
};

type UseModularReturnHooksType = (
  config: ModularProps,
) => ModularReturnHooksType;

export type ShowModular = {
  info: UseModularReturnHooksType;
  success: UseModularReturnHooksType;
  error: UseModularReturnHooksType;
  warning: UseModularReturnHooksType;
  show: UseModularReturnHooksType;
};

export default function useModular(): ShowModular {
  return useContext(ModularContext);
}
