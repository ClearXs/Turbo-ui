import { IdEntity } from '@/api/interface';
import TForm from '@/components/TForm';
import { FormColumnProps, FormContext } from '@/components/TForm/interface';

const ChangePasswordForm: React.FC<{
  onOk: (formContext: FormContext<IdEntity>) => void;
}> = ({ onOk }) => {
  const columns: FormColumnProps<IdEntity>[] = [
    {
      label: '原密码',
      field: 'rawPassword',
      type: 'input',
      require: true,
    },
    {
      label: '新密码',
      field: 'newPassword',
      type: 'input',
      require: true,
    },
    {
      label: '确认新密码',
      field: 'confirmNewPassword',
      type: 'input',
      require: true,
    },
  ];
  return (
    <TForm<IdEntity>
      model=""
      columns={columns}
      onOk={onOk}
      immediateVisible={true}
      validateFields={(values) => {
        return values['confirmNewPassword'] !== values['newPassword']
          ? undefined
          : '两次密码不一致';
      }}
    />
  );
};

export default ChangePasswordForm;
