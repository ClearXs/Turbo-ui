import TableCrud from '@/components/table-crud';
import CredentialHelper from './helper';
import { Credential } from '@/api/ai/credential';

const CredentialPage = () => {
  const api = CredentialHelper.getApi();
  return (
    <TableCrud<Credential>
      mode="page"
      useApi={api}
      columns={CredentialHelper.getColumns()}
    />
  );
};

export default CredentialPage;
