import useRequest from '@/hook/useRequest';
import {
  GeneralApi,
  GeneralApiImpl,
  GeneralParams,
  Pagination,
  R,
  TenantEntity,
} from '..';

export interface Message extends TenantEntity {
  /**
   * 消息标题
   */
  title: string;

  /**
   * 副标题
   */
  subtitle: string;

  /**
   * 消息内容
   */
  content: string;

  /**
   * 消息来源
   */
  messageSource: string;

  /**
   * 消息状态
   */
  messageStatus: 'READ' | 'UNREAD';

  /**
   * 消息类型
   */
  messageType: string;

  /**
   * 发送人
   */
  sendUser: number;

  /**
   * 发送时间
   */
  sendTime: string;

  /**
   * pc url
   */
  pcUrl: string;

  /**
   * app url
   */
  appUrl: string;

  /**
   * 接收人
   */
  receiver: number;

  /**
   * 消息配置Key
   */
  configKey: string;

  /**
   * 消息模板Key
   */
  templateKey: string;

  /**
   * 通知类型
   */
  action: string;
}

export interface MessageApi extends GeneralApi<Message> {
  /**
   * get current user messages
   *
   * @param page the page parameter
   * @param params the query params
   * @returns the message pagination
   */
  currentUserMessage: (
    page: Pagination<Message>,
    params: GeneralParams<Message>,
  ) => Promise<R<Pagination<Message>>>;

  /**
   * get current user message count
   * @param params the query params
   * @returns count
   */
  currentUserMessageCount: (
    params: GeneralParams<Message>,
  ) => Promise<R<number>>;

  /**
   * set message is read
   * @param id the message id
   * @returns true if success
   */
  read: (ids: string[]) => Promise<R<boolean>>;

  /**
   * publish message by message config key
   * @param configKey message config key
   * @param variables message publish variables
   * @returns void
   */
  publish: (configKey: string, variables: Record<string, any>) => Promise<void>;
}

class MessageApiImpl extends GeneralApiImpl<Message> implements MessageApi {
  currentUserMessage(
    page: Pagination<Message>,
    params: GeneralParams<Message>,
  ): Promise<R<Pagination<Message>>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + '/current-user/all', { page, ...queryParam })
      .then((res) => {
        return res.data;
      });
  }

  currentUserMessageCount(params: GeneralParams<Message>): Promise<R<number>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + '/current-user/count', { ...queryParam })
      .then((res) => {
        return res.data;
      });
  }

  read(ids: string[]): Promise<R<boolean>> {
    return this.request
      .put(this.apiPath + '/read', ids)
      .then((res) => res.data);
  }

  publish(configKey: string, variables: Record<string, any>): Promise<void> {
    return this.request
      .post(this.apiPath + '/publish', { configKey, ...variables })
      .then();
  }
}

export default function useMessageApi(): MessageApi {
  const request = useRequest();
  return new MessageApiImpl('/api/sys/message', request);
}
