// 统一返回结构
export interface R<T> {
  code: number;
  message: string;
  data: T;
}

// 基础实体类型
export interface BaseEntity {
  /**
   * 主键
   */
  id: string;

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

export interface Tree {
  id: string;
  depth: number;
  leaf: boolean;
  path: string;
  parent: Tree;
  children: Tree[];
}

// 包含租户的实体
export interface TenantEntity extends BaseEntity {
  /**
   * 租户
   */
  tenantId: string;
}

// 分页配置
export interface Pagination<T> {
  // 当前页
  current: number;
  // 页大小
  size: number;
  // 总数
  total?: number;
  // 数据
  records?: T[];
}

/**
 * 通用模板接口定义
 */
export interface GeneralApi<T> {
  /**
   * 保存
   * @param entity 实体
   * @returns true or false
   */
  save: (entity: T) => Promise<R<boolean>>;

  /**
   * 编辑
   * @param entity 实体
   * @returns true or false
   */
  edit: (entity: T) => Promise<R<boolean>>;

  /**
   * 保存
   * @param entity 实体
   * @returns true or false
   */
  saveOrUpdate: (entity: T) => Promise<R<boolean>>;

  /**
   * 删除
   * @param id id
   * @returns true or false
   */
  deleteEntity: (ids: string[]) => Promise<R<boolean>>;

  /**
   * 详情
   * @param id id
   * @returns 实体 or null
   */
  details: (string: string) => Promise<R<T>>;

  /**
   * 列表
   * @param entity 用于过滤实体
   * @returns list
   */
  list: (entity: T) => Promise<R<T[]>>;

  /**
   * 分页
   * @param page 分页
   * @param entity 实体
   * @returns page
   */
  page: (page: Pagination<T>, entity: T) => Promise<R<Pagination<T>>>;
}
