import * as local from '@/util/local';
import * as constants from '@/util/constant';

const useToken = () => {
  return local.get(constants.Authentication) || '';
};

export default useToken;
