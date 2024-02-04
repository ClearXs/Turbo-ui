import { Form } from '@/api/developer/form';
import { Kernel } from './kernel';
import { DesignableProps } from './Editor';

export type ViewType =
  | 'formDesign'
  | 'dataView'
  | 'pageSetting'
  | 'dataManager';

export type EditorProps = {
  form: Form;
  // 视图类型
  panels: ViewType[];
  onSave?: (kernel: Kernel, designableProps: DesignableProps) => void;
  onPublish?: (kernel: Kernel, designableProps: DesignableProps) => void;
  onClose?: (designableProps: DesignableProps) => void;
};
