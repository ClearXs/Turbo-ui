import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import { RootStore } from '@/stores';

export default function useStore() {
  return useContext(MobXProviderContext) as RootStore;
}
