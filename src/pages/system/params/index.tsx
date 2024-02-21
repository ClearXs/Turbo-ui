import TableCrud from '@/components/TableCrud';
import ParamsHelper from '../params/helper';
import { Params } from '@/api/system/params';

const Params = () => {
  return (
    <TableCrud<Params>
      mode="page"
      useApi={ParamsHelper.getApi}
      columns={ParamsHelper.getColumns()}
    />
  );
};

export default Params;
