import useRequest, { InternalRequest } from '@/hook/request';

type RegistrationCode =
  | 'github'
  | 'gitee'
  | 'wechat-mp'
  | 'wechat-enterprise'
  | 'weibo'
  | 'qq'
  | 'baidu'
  | 'tiktok'
  | 'taobao';

interface OAuth2Api {
  /**
   *
   * user authorization from third system
   * @param code authorization brand code
   * @returns
   */
  authorization: (code: RegistrationCode) => Promise<any>;
}

class OAuth2ApiImpl implements OAuth2Api {
  constructor(protected request: InternalRequest) {}

  authorization(code: RegistrationCode): Promise<any> {
    return fetch(`/api/oauth2/authorization/${code}`).then((res) => res.json);
  }
}

export default function useOAuth2Api(): OAuth2Api {
  const request = useRequest();
  return new OAuth2ApiImpl(request);
}
