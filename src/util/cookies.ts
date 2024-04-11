import Cookies from 'js-cookie';
import _ from 'lodash';

/**
 * 获取cookie
 *
 * @param {string} key cookie key
 *
 * @returns cookie value
 */
export const get = (
  key: string,
  attributes?: Cookies.CookieAttributes,
): string => {
  if (_.isEmpty(attributes)) {
    return Cookies.get(key);
  }
  const api = Cookies.withAttributes(attributes);
  return api.get(key);
};

/**
 * contains key has existing cookies
 *
 * @param key the key
 * @returns
 */
export const contains = (key: string): boolean => {
  return get(key) !== undefined;
};

/**
 * set the value to cookies
 *
 * @param key
 * @param value
 * @param opt
 */
export const set = (
  key: string,
  value: string,
  opts?: Cookies.CookieAttributes,
) => {
  Cookies.set(key, value, opts);
};

/**
 * remove cookie by key
 * @param key the key
 * @param opts the cookies opts
 */
export const remove = (key: string, opts?: Cookies.CookieAttributes) => {
  Cookies.remove(key, opts);
};
