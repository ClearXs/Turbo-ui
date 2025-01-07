import * as auth from '@/util/auth';

export const useAuth = () => {
  return auth.get();
};
