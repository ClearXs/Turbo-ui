import { IdEntity } from '@/api';
import TForm from '@/components/TForm/TForm';
import { FormColumnProps, FormContext } from '@/components/TForm/interface';

export type ChangePasswordType = IdEntity & {
  rawPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const changePasswordColumns: FormColumnProps<ChangePasswordType>[] = [
  {
    label: '原密码',
    field: 'rawPassword',
    type: 'input',
    require: true,
    line: true,
    rules: [{ min: 6, message: '至少输入6位!' }],
  },
  {
    label: '新密码',
    field: 'newPassword',
    type: 'input',
    require: true,
    line: true,
    rules: [{ min: 6, message: '至少输入6位!' }],
  },
  {
    label: '确认新密码',
    field: 'confirmNewPassword',
    type: 'input',
    require: true,
    line: true,
    validate: (fieldValue, values) => {
      if (fieldValue !== values['newPassword']) {
        return '密码不一致';
      }
      return '';
    },
  },
];

const ChangePasswordForm: React.FC<{
  onOk: (formContext: FormContext<ChangePasswordType>) => void;
  onCancel: (formContext: FormContext<ChangePasswordType>) => void;
  hiddenRawPassword?: boolean;
}> = ({ onOk, onCancel, hiddenRawPassword = false }) => {
  return (
    <TForm<ChangePasswordType>
      mode="simply"
      title="修改密码"
      columns={changePasswordColumns}
      onOk={onOk}
      onCancel={onCancel}
      immediateVisible={true}
      modal={{ size: 'small' }}
    />
  );
};

export default ChangePasswordForm;
