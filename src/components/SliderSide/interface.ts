import { SideSheetReactProps } from '@douyinfe/semi-ui/lib/es/sideSheet';
import { DialogButtonProps, DialogProps } from '../Dialog/interface';

export type SliderSideProps = DialogProps & {
  size?: SideSheetReactProps['size'];
};

export type SliderSideButton = DialogButtonProps;
