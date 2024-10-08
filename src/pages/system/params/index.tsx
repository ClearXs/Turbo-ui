import TableCrud from '@/components/table-crud';
import ParamsHelper from './helper';
import { Params } from '@/api/system/params';

const ParamsComponent = () => {
  return (
    <TableCrud<Params>
      mode="page"
      useApi={ParamsHelper.getApi}
      columns={ParamsHelper.getColumns()}
    />
  );
};

export default ParamsComponent;
