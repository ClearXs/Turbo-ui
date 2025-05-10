import useStore from './useStore';
import useToken from './useToken';
import * as constants from '@/util/constant';

const useWebSocket = (url: string) => {
  const token = useToken();
  const store = useStore();

  // url?X-AUTHENTICATION=${token}&
  const secureUrl = `${url}?${constants.Authentication}=${token}&${constants.Tenant}=${store.user?.currentUser?.tenantId}`;
  const websocket = new WebSocket(secureUrl);

  return websocket;
};

export default useWebSocket;
