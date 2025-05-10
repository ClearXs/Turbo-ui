import TableCrud from '@/components/table-crud';
import AgentHelper from './helper';
import { Agent } from '@/api/ai/agent';

const AgentPage = () => {
  const api = AgentHelper.getApi();
  return (
    <TableCrud<Agent>
      mode="page"
      useApi={api}
      columns={AgentHelper.getColumns()}
    />
  );
};

export default AgentPage;
