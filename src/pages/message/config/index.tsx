import TableCrud from '@/components/TableCrud';
import { MessageConfig } from '@/api/message/config';
import MessageConfigHelper from './helper';

const MessageConfigComponent = () => {
  return (
    <TableCrud<MessageConfig>
      mode="page"
      useApi={MessageConfigHelper.getApi}
      columns={MessageConfigHelper.getColumns()}
    />
  );
};

export default MessageConfigComponent;
