import TableCrud from '@/components/table-crud';
import { MessageTemplate } from '@/api/message/template';
import MessageTemplateHelper from './helper';

const MessageTemplatePage = () => {
  const messageTemplateApi = MessageTemplateHelper.getApi();
  return (
    <TableCrud<MessageTemplate>
      mode="page"
      useApi={messageTemplateApi}
      columns={MessageTemplateHelper.getColumns()}
    />
  );
};

export default MessageTemplatePage;
