import TableCrud from '@/components/TableCrud';
import { MessageTemplate } from '@/api/message/template';
import MessageTemplateHelper from './helper';

const MessageTemplateComponent = () => {
  return (
    <TableCrud<MessageTemplate>
      mode="page"
      useApi={MessageTemplateHelper.getApi}
      columns={MessageTemplateHelper.getColumns()}
    />
  );
};

export default MessageTemplateComponent;
