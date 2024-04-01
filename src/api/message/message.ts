import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

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
  messageStatus: string;

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
  sendTime: Date;

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

export interface MessageApi extends GeneralApi<Message> {}

class MessageApiImpl extends GeneralApiImpl<Message> implements MessageApi {}

export default function useMessageApi(): MessageApi {
  const request = useRequest();
  return new MessageApiImpl('/api/sys/message', request);
}
