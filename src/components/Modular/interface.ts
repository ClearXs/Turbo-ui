import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';
import { DialogButtonProps, DialogProps } from '../dialog/interface';

export type ModularProps = DialogProps & {
  // 大小
  size?: ModalReactProps['size'];
  // 是否全屏
  fullScreen?: boolean;
};

export type ModularButton = DialogButtonProps;
