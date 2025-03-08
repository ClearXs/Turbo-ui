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
}

export interface Conversation extends Chat {
  latestUserMessage: string;
  messages: [];
}

export interface ChatApi extends GeneralApi<Chat> {
  newConversation: () => Promise<R<Chat>>;
  mineConversation: (
    page: Pagination<Chat>,
    params?: GeneralParams<Chat>,
  ) => Promise<R<Pagination<Conversation>>>;
}

class ChatApiImpl extends GeneralApiImpl<Chat> implements ChatApi {
  newConversation(): Promise<R<Chat>> {
    return this.request.post(this.apiPath + '/newConversation').then((res) => {
      return res.data;
    });
  }
  mineConversation(
    page: Pagination<Chat>,
    params?: GeneralParams<Chat>,
  ): Promise<R<Pagination<Conversation>>> {
    return this.request
      .post(this.apiPath + '/mineConversation', { page, ...params })
      .then((res) => {
        return res.data;
      });
  }
}

export default function useChatApi(): ChatApi {
  const request = useRequest();
  return new ChatApiImpl('/api/ai/chat', request);
}
