import { tryGetIcon } from '@/components/icon';
import { DialogButtonProps, DialogProps } from '../interface';

const useBottomButton = ({
  beforeConfirm,
  onConfirm,
  beforeCancel,
  onCancel,
  showConfirm = true,
  showCancel = true,
  append = [],
}: DialogProps) => {
  const powerfulConfirm = () => {
    try {
      if (beforeConfirm) {
        beforeConfirm(onConfirm);
      } else {
        onConfirm?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const powerfulCancel = () => {
    try {
      if (beforeCancel) {
        beforeCancel(onCancel);
      } else {
        onCancel?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const modularButtons: DialogButtonProps[] = [];

  if ((typeof showCancel === 'function' && showCancel()) || showCancel) {
    modularButtons.push({
      code: 'cancel',
      name: '取消',
      type: 'tertiary',
      size: 'default',
      icon: tryGetIcon('IconCrossCircleStroked'),
      onClick() {
        powerfulCancel();
      },
    });
  }

  if ((typeof showConfirm === 'function' && showConfirm()) || showConfirm) {
    modularButtons.push({
      code: 'confirm',
      name: '确定',
      type: 'primary',
      loading: true,
      size: 'default',
      icon: tryGetIcon('IconCheckCircleStroked'),
      onClick() {
        powerfulConfirm();
      },
    });
  }
  append.forEach((button) => modularButtons.push(button));

  return { modularButtons, powerfulConfirm, powerfulCancel };
};

export default useBottomButton;
