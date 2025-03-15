import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface AIMessage extends TenantEntity {
  /**
   * 角色;USER、SYSTEM
   */
  role: 'instruction' | 'user' | 'system' | 'assistant' | 'tool';

  /**
   * 内容
   */
  content: string;

  /**
   * 方式;HTTP、WS
   */
  method: string;

  /**
   * 会话ID
   */
  chatId: string;

  /**
   * sessionID
   */
  sessionId: string;
}

export interface AIMessageApi extends GeneralApi<AIMessage> {}

class AIMessageApiImpl
  extends GeneralApiImpl<AIMessage>
  implements AIMessageApi {}

export default function useAIMessageApi(): AIMessageApi {
  const request = useRequest();
  return new AIMessageApiImpl('/api/ai/chat', request);
}
