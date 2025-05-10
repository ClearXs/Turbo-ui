import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface Credential extends TenantEntity {
  /**
   * 名称
   */
  name: string;

  /**
   * api key;Optional
   */
  apiKey: string;

  /**
   * 密钥
   */
  secretKey: string;
}

export interface CredentialApi extends GeneralApi<Credential> {}

class CredentialApiImpl
  extends GeneralApiImpl<Credential>
  implements CredentialApi {}

export default function useCredentialApi(): CredentialApi {
  const request = useRequest();
  return new CredentialApiImpl('/api/ai/credential', request);
}
