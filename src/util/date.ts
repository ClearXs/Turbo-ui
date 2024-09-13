import moment from 'moment';

export const PATTERN_DATETIME = 'yyyy-MM-DD HH:mm:ss';
export const PATTERN_DATETIME_MINI = 'yyyyMMDDHHmmss';
export const PATTERN_DATE = 'yyyy-MM-DD';
export const PATTERN_HOUR = 'yyyy-MM-DD HH';
export const PATTERN_MONTH = 'yyyy-MM';
export const PATTERN_YEAR = 'yyyy';

export const PATTERN_TIME = 'HH:mm:ss';

/**
 * 时间字符串格式化
 * @param dateStr 时间字符串 2023-01-01
 * @param format yyyy-MM-dd 默认值为yyyy-MM-dd HH:mm:ss
 * @returns Date
 */
export const format = (
  dateStr: string,
  format: string = PATTERN_DATETIME,
): Date | undefined => {
  if (dateStr) {
    return moment(dateStr, format).toDate();
  }
  return undefined;
};

/**
 * 解析
 * @param date 时间示例
 * @param format yyyy-MM-dd 默认值为yyyy-MM-dd HH:mm:ss
 */
export const parse = (
  date: Date | string,
  format: string = PATTERN_DATETIME,
): string | undefined => {
  if (typeof date === 'string') {
    return moment(date).format(format);
  } else {
    return moment(date).format(format);
  }

  return undefined;
};
