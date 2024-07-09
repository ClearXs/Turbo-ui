import * as local from './local';
import * as constants from './constant';
import * as cookies from './cookies';
import _ from 'lodash';

/**
 * set the token to local storage,exclude empty token
 *
 * @param tokenString the token string
 */
export const set = (tokenString: string) => {
  if (!_.isEmpty(tokenString)) {
    local.set(constants.Authentication, tokenString);
  }
};

/**
 * get token with the local storage
 */
export const get = (): string | null => {
  return local.get(constants.Authentication);
};

/**
 * remove auth from local storage and cookies
 */
export const clear = () => {
  local.remove(constants.Authentication);
  cookies.remove(constants.Authentication);
};

/**
 * from window add token by url
 *
 * @param url
 */
export const open = (url: string) => {
  const authPair = `${constants.Authentication}=${get()}`;
  const authUrl = url.includes('?')
    ? url.concat(`&${authPair}`)
    : url.concat(`?${authPair}`);
  window.open(authUrl);
};
