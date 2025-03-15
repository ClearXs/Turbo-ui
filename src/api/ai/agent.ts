import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface Agent extends TenantEntity {
  /**
   * 名称
   */
  name: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 系统提示词
   */
  prompt: string;

  /**
   * List of String
   */
  actions: string;

  /**
   * JSON SCHEMA
   */
  tools: string;

  /**
   * List of string
   */
  externalTools: string;

  /**
   * 是否内置
   */
  builtIn: boolean;
}

export interface AgentApi extends GeneralApi<Agent> {}

class AgentApiImpl extends GeneralApiImpl<Agent> implements AgentApi {}

export default function useAgentApi(): AgentApi {
  const request = useRequest();
  return new AgentApiImpl('/api/ai/agent', request);
}
