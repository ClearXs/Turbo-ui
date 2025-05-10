import { Entity } from '@/api';
import { FormColumnProps, Pair } from '../interface';

export type BarrierColumns<T extends Entity> = {
  // 该栅栏位能容纳的最大column数量
  maxColumns: number;
  columns: FormColumnProps<T>[];
};

/**
 * 按照{@code FormColumnProps#span}进行区块切分
 * @param columns form columns
 */
export const chunk = <T extends Entity>(
  columns: FormColumnProps<T>[],
  defaultSpan: number = 12,
): BarrierColumns<T>[] => {
  const speculationMaxColumns = (part: FormColumnProps<T>[]) => {
    return part.length > 1 ? part.length : 2;
  };

  const chunks: BarrierColumns<T>[] = [];
  let part: FormColumnProps<T>[] = [];

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    // 判断是否成为一行，如果在上一个未充满整行，'part'则会存在值，此时让part单独成一行
    if (column.line) {
      if (part.length > 0) {
        chunks.push({ maxColumns: speculationMaxColumns(part), columns: part });
        part = [];
      }
      part = [column];
      chunks.push({ maxColumns: 1, columns: part });
      part = [];
      continue;
    }
    // 判断part参数与当前column的span是否超过24一行
    // 如果超过则先把part中单独成一行，否则添加在一起
    const totalSpan = [...part, column]
      .map((c) => c.span || defaultSpan)
      .reduce((pre, cur) => pre + cur, 0);
    if (totalSpan >= 24) {
      part.push(column);
      chunks.push({ maxColumns: speculationMaxColumns(part), columns: part });
      part = [];
    } else {
      part.push(column);
    }
    if (i === columns.length - 1 && part.length > 0) {
      chunks.push({ maxColumns: speculationMaxColumns(part), columns: part });
    }
  }
  return chunks;
};

/**
 * key value 二元组转换为record对象
 * @param pair 二元组
 * @returns record对象
 */
export const kvPairToObject = (pair: Pair[]): Record<string, object> => {
  const record: Record<string, any> = {};
  for (const k in pair) {
    const kv = pair[k];
    record[kv.key] = kv.value;
  }
  return record;
};

/**
 * 找到二元组中的value
 * @param pair 二元组
 * @param key key
 * @returns
 */
export const findPairValue = (
  pair: Pair[],
  key: Pair['key'],
): Pair['value'] | undefined => {
  return pair.find((kv) => kv.key === key)?.value;
};
