import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface MessageLog extends TenantEntity {
  /**
   * 发送人
   */
  sendUser: number;

  /**
   * 发送时间
   */
  sendTime: Date;

  /**
   * 接收人
   */
  receiver: number;

  /**
   * 消息id
   */
  messageId: number;

  /**
   * 运行时消息变量
   */
  variables: string;

  /**
   * 消息发送状态
   */
  sendStatus: string;
}

export interface MessageLogApi extends GeneralApi<MessageLog> {}

class MessageLogApiImpl
  extends GeneralApiImpl<MessageLog>
  implements MessageLogApi {}

export default function useMessageLogApi(): MessageLogApi {
  const request = useRequest();
  return new MessageLogApiImpl('/api/sys/message/log', request);
}
