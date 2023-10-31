// 统一返回结构
export interface R<T> {
  code: number;
  message: string;
  data: T | null;
}

// 基础实体类型
export interface BaseEntity {
  /**
   * 主键
   */
  id: number;

  /**
   * 创建时间
   */
  createdTime: Date;

  /**
   * 创建人
   */
  createdBy: number;

  /**
   * 更新时间
   */
  updatedTime: Date;

  /**
   * 更新人
   */
  updatedBy: number;

  /**
   * 逻辑删除
   */
  isDeleted: number;

  /**
   * 版本号
   */
  version: number;
}

// 包含租户的实体
export interface TenantEntity extends BaseEntity {
  /**
   * 租户
   */
  tenantId: string;
}

abstract class BaseResponse<T> implements R<T> {
  constructor(
    public code: number,
    public data: T | null,
    public message: string,
  ) {}
}

export class Exceptions<T> extends BaseResponse<T> {
  constructor(
    public code: number,
    public data: T | null,
    public message: string,
  ) {
    super(code, data, message);
  }

  public static create<T>(code: number, data: T, message: string): R<T> {
    return new Exceptions<T>(code, data, message);
  }
}

export class Messages<T> extends BaseResponse<T> {
  constructor(
    public code: number,
    public data: T | null,
    public message: string,
  ) {
    super(code, data, message);
  }

  public static create<T>(code: number, data: T, message: string): R<T> {
    return new Messages<T>(code, data, message);
  }
}
