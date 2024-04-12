import { SystemError } from '@/error/interface';
import { atom } from 'recoil';

const namespace = 'error';

// 当系统运行过程中发生的错误通过该state进行设置（发布信号量至处理端进行处理）
export const ErrorState = atom<SystemError | undefined>({
  key: `${namespace}`,
  default: undefined,
});
