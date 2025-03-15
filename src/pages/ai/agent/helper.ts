import useAgentApi, { Agent, AgentApi } from '@/api/ai/agent';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';

const AgentHelper: Helper<Agent, AgentApi> = {
  getColumns: () => {
    return [
      {
        label: '名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },

      {
        label: '描述',
        field: 'description',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },

      {
        label: '系统提示词',
        field: 'prompt',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },

      {
        label: 'List of String',
        field: 'actions',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },

      {
        label: 'JSON SCHEMA',
        field: 'tools',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },

      {
        label: 'List of string',
        field: 'externalTools',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },

      {
        label: '是否内置',
        field: 'builtIn',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
    ] as TableColumnProps<Agent>[];
  },
  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useAgentApi,
};

export default AgentHelper;
