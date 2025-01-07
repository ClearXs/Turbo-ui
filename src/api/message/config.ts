import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export type SendWay = 'SYSTEM' | 'SMS';
export type Protocol = 'WEBSOCKET' | 'MQTT';
export type NotificationType = 'Remind' | 'Notice' | 'Alert';

export type RetryStrategy =
  | 'IGNORE'
  | 'EXECUTE_IMMEDIATELY'
  | 'DELAYED_EXECUTION';

export type Target = 'ORG' | 'POST' | 'ROLE' | 'USER' | 'CUSTOM' | 'ALL_USER';

export type RetryFailed = {
  /**
   * 消息重试策略
   * <p>IGNORE 忽略 EXECUTE_IMMEDIATELY 立即执行 DELAYED_EXECUTION 延迟执行</p>
   */
  strategy: RetryStrategy;

  /**
   * Optional.重试次数
   */
  count: number;

  /**
   * Optional.延迟时间
   */
  timeout: number;
};

export type SendModel = {
  /**
   * 发送方式
   * <P>SYSTEM 系统信息、SMS 短信 EMAIL 邮箱 DINGDING</P>
   */
  sendWay: SendWay;

  /**
   * 发送标识 用于SMS、EMAIL等
   */
  sendKey: string;

  /**
   * 消息推送的网络集合
   * <p>WEBSOCKET、MQTT</p>
   */
  protocols: Protocol[];
};

export type SendTarget = {
  /**
   * 用户类型
   * <p>ORG 组织、GROUP 用户组、ROLE 角色、USER 指定用户、CUSTOM 自定义</p>
   */
  target: Target;

  /**
   * 标识
   */
  key: string;
};

export interface MessageConfig extends TenantEntity {
  /**
   * 配置Key
   */
  key: string;

  /**
   * 配置名称
   */
  name: string;

  /**
   * 是否启用
   */
  enabled: boolean;

  /**
   * 发送方式模板配置
   * <p>[{"sendWay":"发送方式 SYSTEM 系统信息、SMS 短信 EMAIL 邮箱 DINGDING ","sendKey":"发送标识","protocol":"系统消息发送协议 WEBSOCKET 、MQTT "}],</p>
   */
  sendModel: SendModel[];

  /**
   * 消息类型
   */
  messageType: string;

  /**
   * 通知类型
   */
  noticeType: NotificationType;

  /**
   * 失败重试
   * <p>{"strategy":"IGNORE 忽略 EXECUTE_IMMEDIATELY 立即执行 DELAYED_EXECUTION 延迟执行  ","count":1,"timeout":100000}</p>
   */
  retryFailed: RetryFailed;

  /**
   * 发送目标
   * <p>[{"type":"用户类型 ORG 组织、GROUP 用户组、ROLE 角色、USER 指定用户、CUSTOM 自定义 ","key":"标识"}]/p>
   */
  sendTargets: SendTarget[];

  /**
   * 默认消息模板
   */
  defaultTemplateIds: number[];
}

export interface MessageConfigApi extends GeneralApi<MessageConfig> {}

class MessageConfigApiImpl
  extends GeneralApiImpl<MessageConfig>
  implements MessageConfigApi {}

export default function useMessageConfigApi(): MessageConfigApi {
  const request = useRequest();
  return new MessageConfigApiImpl('/api/sys/message/config', request);
}
