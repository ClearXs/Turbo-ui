import { IdEntity } from '@/api/interface';
import TForm from '@/components/TForm';
import { FormColumnProps, FormContext } from '@/components/TForm/interface';

export type ChangePasswordType = IdEntity & {
  rawPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePasswordForm: React.FC<{
  onOk: (formContext: FormContext<ChangePasswordType>) => void;
  onCancel: (formContext: FormContext<ChangePasswordType>) => void;
  hiddenRawPassword?: boolean;
}> = ({ onOk, onCancel, hiddenRawPassword = false }) => {
  const columns: FormColumnProps<ChangePasswordType>[] = [
    {
      label: '原密码',
      field: 'rawPassword',
      type: 'input',
      require: true,
      line: true,
      form: !hiddenRawPassword,
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
  return (
    <TForm<ChangePasswordType>
      model=""
      title="修改密码"
      columns={columns}
      size="small"
      onOk={onOk}
      onCancel={onCancel}
      immediateVisible={true}
    />
  );
};

export default ChangePasswordForm;
