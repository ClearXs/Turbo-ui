import TableCrud from '@/components/table-crud';
import ParamsHelper from './helper';
import { Params } from '@/api/system/params';

const ParamsPage = () => {
  const paramApi = ParamsHelper.getApi();
  return (
    <TableCrud<Params>
      mode="page"
      useApi={paramApi}
      columns={ParamsHelper.getColumns()}
    />
  );
};

export default ParamsPage;
