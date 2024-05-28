import { tryGetIcon } from '@/components/Icon';
import { DialogProps } from '../interface';

export const TypeIcons: Record<string, React.ReactNode> = {};
TypeIcons['info'] = tryGetIcon('IconInfoCircle', {
  size: 'large',
  className: 'semi-modal-info-icon',
});
TypeIcons['warning'] = tryGetIcon('IconIssueStroked', {
  size: 'large',
  className: 'semi-modal-warning-icon',
});
TypeIcons['error'] = tryGetIcon('IconClose', {
  size: 'large',
  className: 'semi-modal-error-icon',
});
TypeIcons['success'] = tryGetIcon('IconCheckCircleStroked', {
  size: 'large',
  className: 'semi-modal-success-icon',
});

const useIcon = ({ type, icon }: DialogProps) => {
  return (type && TypeIcons[type]) || icon;
};

export default useIcon;
