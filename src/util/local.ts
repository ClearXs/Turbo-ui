// 操作localStroage

/**
 * 获取cookie
 *
 * @param {string} key local stroage key
 * @returns local stroage value
 */
export const get = (key: string): string | null => {
  return localStorage.getItem(key)
}

/**
 * 判断key是否存在
 * @param key local stroage key
 * @returns true contains otherwise false
 */
export const contains = (key: string): boolean => {
  return get(key) != null
}

/**
 * 设置
 * @param key
 * @param value
 * @param opt
 */
export const set = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

/**
 * 根据key移除
 * @param key key
 */
export const remove = (key: string) => {
  localStorage.removeItem(key)
}

/**
 * 清楚数据
 */
export const clear = () => {
  localStorage.clear()
}
