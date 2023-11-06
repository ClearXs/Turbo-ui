type Opt = {
  expried: number;
};

/**
 * 获取cookie
 *
 * @param {string} key cookie key
 * @returns cookie value
 */
export const get = (key: string): string | number | undefined => {
  return document.cookie
    .split(';')
    .filter((v) => {
      const kv: string[] = v.split('=');
      return kv[0] === key;
    })
    .map((v) => {
      return decodeURIComponent(v[1]);
    })
    .pop();
};

/**
 * 设置
 * @param key
 * @param value
 * @param opt
 */
export const set = (key: string, value: string, opt?: Opt) => {
  document.cookie = document.cookie.concat(`;${key}=${value}`);
  if (opt) {
    setInterval(() => {
      remove(key);
    }, opt.expried);
  }
};

export const remove = (key: string) => {
  document.cookie = document.cookie
    .split(';')
    .filter((v) => {
      const kv: string[] = v.split('=');
      return kv[0] !== key;
    })
    .map((v) => {
      return decodeURIComponent(v[1]);
    })
    .join(';');
};
