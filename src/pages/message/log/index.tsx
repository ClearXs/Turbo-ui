import TableCrud from '@/components/TableCrud';
import MessageTemplateHelper from './helper';
import { MessageLog } from '@/api/message/log';

const MessageLogComponent = () => {
  return (
    <TableCrud<MessageLog>
      mode="page"
      useApi={MessageTemplateHelper.getApi}
      columns={MessageTemplateHelper.getColumns()}
      toolbar={{ showAdd: false }}
      operateBar={{ showDetails: false }}
    />
  );
};

export default MessageLogComponent;
