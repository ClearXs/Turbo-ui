import TableCrud from '@/components/table-crud';
import ParamsHelper from './helper';
import { Params } from '@/api/system/params';
import { observer } from 'mobx-react';

const ParamsPage = () => {
  return (
    <TableCrud<Params>
      mode="page"
      useApi={ParamsHelper.getApi}
      columns={ParamsHelper.getColumns()}
    />
  );
};

export default observer(ParamsPage);
