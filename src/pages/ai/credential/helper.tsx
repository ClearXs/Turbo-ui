import useCredentialApi, {
  Credential,
  CredentialApi,
} from '@/api/ai/credential';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';

const CredentialHelper: Helper<Credential, CredentialApi> = {
  getColumns: () => {
    return [
      {
        label: '名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        type: 'input',
        search: true,
        require: true,
      },
      {
        label: 'api key',
        field: 'apiKey',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },

      {
        label: '密钥',
        field: 'secretKey',
        ellipsis: true,
        align: 'center',
        type: 'password',
        require: true,
      },
    ] as TableColumnProps<Credential>[];
  },
  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useCredentialApi,
};

export default CredentialHelper;
