import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export type Variable = {
  /**
   * 变量Key
   */
  key: string;

  /**
   * 描述
   */
  des: string;

  /**
   * 默认值
   */
  defaultValue: string;
};

export type Extension = {
  /**
   * pc url
   */
  pcUrl: string;

  /**
   * app url
   */
  appUrl: string;
};

export interface MessageTemplate extends TenantEntity {
  /**
   * 模板Key
   */
  key: string;

  /**
   * 模板名称
   */
  name: string;

  /**
   * 消息标题
   */
  title: string;

  /**
   * 消息副标题
   */
  subtitle: string;

  /**
   * 模板内容
   */
  template: string;

  /**
   * 模板变量
   * <p>[{"key":"var1","des":"描述","defaultValue":""}]</p>
   */
  variables: Variable[];

  /**
   * 拓展配置
   * <p>{"pcUrl":"","appUrl":""}</p>
   */
  extension: Extension;
}

export interface MessageTemplateApi extends GeneralApi<MessageTemplate> {}

class MessageTemplateApiImpl
  extends GeneralApiImpl<MessageTemplate>
  implements MessageTemplateApi {}

export default function useMessageTemplateApi(): MessageTemplateApi {
  const request = useRequest();
  return new MessageTemplateApiImpl('/api/sys/message/template', request);
}
