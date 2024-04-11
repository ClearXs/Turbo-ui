import { Constant } from '.';

export const RetryStrategy: Constant[] = [
  {
    value: 'IGNORE',
    label: '忽略',
  },
  {
    value: 'EXECUTE_IMMEDIATELY',
    label: '立即执行',
  },
  {
    value: 'DELAYED_EXECUTION',
    label: '延迟执行',
  },
];
