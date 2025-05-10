import useRequest from '@/hook/useRequest';
import {
  GeneralApi,
  GeneralApiImpl,
  GeneralParams,
  Pagination,
  R,
  TenantEntity,
} from '..';

export interface Chat extends TenantEntity {
  /**
   * 会话 Session ID
   */
  sessionId: string;

  /**
   * 用户id
   */
  userId: bigint;

  /**
   * 模型参数
   */
  modelOptions: ModelOptions;

  /**
   * 执行模式
   */
  executionMode: 'stream' | 'call';

  /**
   * 对话参数
   */
  options: Options;

  /**
   * agent
   */
  agent: string;
}

export type ModelOptions = {
  // Model provider/manufacturer
  manufacturer?:
    | 'openai'
    | 'anthropic'
    | 'vertex'
    | 'monoshot'
    | 'qianfan'
    | 'zhipu'
    | 'deepseek'
    | 'ollama';

  // Model API address or accessible address
  // Example: 'http://ollama:11434'
  address?: string;

  // Model name (e.g. 'gpt-4', 'claude-3', etc.)
  model?: string;

  // Access credentials
  apiKey?: string;
  secretKey?: string;

  // Generation parameters
  frequencyPenalty?: number;
  maxTokens?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  temperature?: number;
  topK?: number;
  topP?: number;
};

export type Options = {
  enableLimitHistoryMessages: boolean;
  maxHistoryMessageNums: number;
};

export type Variable = Record<string, any>;

export interface Conversation extends Chat {
  latestUserMessage: string;
}

export interface ChatApi extends GeneralApi<Chat> {
  newConversation: (chat: Partial<Chat>) => Promise<R<Chat>>;
  mineConversation: (
    page: Pagination<Chat>,
    params?: GeneralParams<Chat>,
  ) => Promise<R<Pagination<Conversation>>>;
}

class ChatApiImpl extends GeneralApiImpl<Chat> implements ChatApi {
  newConversation(chat: Partial<Chat>): Promise<R<Chat>> {
    return this.request
      .post(this.apiPath + '/new-conversation', { ...chat })
      .then((res) => {
        return res.data;
      });
  }
  mineConversation(
    page: Pagination<Chat>,
    params?: GeneralParams<Chat>,
  ): Promise<R<Pagination<Conversation>>> {
    return this.request
      .post(this.apiPath + '/get-mine-conversations', { page, ...params })
      .then((res) => {
        return res.data;
      });
  }
}

export default function useChatApi(): ChatApi {
  const request = useRequest();
  return new ChatApiImpl('/api/ai/chat', request);
}
