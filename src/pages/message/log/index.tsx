import TableCrud from '@/components/table-crud';
import { MessageLog } from '@/api/message/log';
import MessageLogHelper from './helper';

const MessageLogPage = () => {
  const messageLogApi = MessageLogHelper.getApi();
  return (
    <TableCrud<MessageLog>
      mode="page"
      useApi={messageLogApi}
      columns={MessageLogHelper.getColumns()}
      toolbar={{ showAdd: false }}
      operateBar={{ showEdit: false }}
    />
  );
};

export default MessageLogPage;
