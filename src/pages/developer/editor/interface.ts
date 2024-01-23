import { Form } from '@/api/developer/form';

export type EditorProps = {
  form: Form;
  onSave?: () => void;
  onPublish?: () => void;
  onClose?: () => void;
};
