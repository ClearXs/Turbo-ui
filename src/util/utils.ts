/**
 * 创建新的数组
 * @param items items
 * @returns
 */
export const newArray = <T>(...items: T[]): T[] => {
  if (items == null || items.length == 0) {
    return [];
  }
  const fully = new Array<T>();
  items.map((item) => fully.push(item));
  return fully;
};

/**
 * 进行对象复制。
 * 比如：
 * origin = {a: '1', b: {c: 1, d: 2}} replace = {b: {c: 2}} = {a: '1', b: {c: 2, d: 2}}
 * 如果输入不存在的属性则也进行添加
 * 比如：
 * origin = {a: '1', b: {c: 1, d: 2}} replace = {b: {e: 2}} = {a: '1', b: {c: 1, d: 2, e: 2}}
 * @param origin 原始对象
 * @param replace 替换的对象
 */
export const shallowCopy = <T extends object>(
  origin: T,
  replace: object,
): T => {
  const newObj = { ...origin };
  const copy = <T extends object>(origin: T, replace: object): T => {
    Object.keys(replace).forEach((key) => {
      if (typeof replace[key] === 'object') {
        copy(origin[key], replace[key]);
      } else {
        origin[key] = replace[key];
      }
    });
    return origin;
  };
  return copy(newObj, replace);
};

let IDX = 36,
  HEX = '';
while (IDX--) HEX += IDX.toString(36);

export function uid(len?: number) {
  let str = '',
    num = len || 11;
  while (num--) str += HEX[(Math.random() * 36) | 0];
  return str;
}
