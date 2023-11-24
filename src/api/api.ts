// 统一返回结构
export interface R<T> {
  code: number;
  message: string;
  data: T;
}

export interface IdEntity {
  /**
   * 主键
   */
  id: string;
}

// 基础实体类型
export interface BaseEntity extends IdEntity {
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

interface TreeNode extends IdEntity {
  /**
   * 树结点code
   */
  code: string;
  /**
   * 树结点name
   */
  name: string;

  /**
   * 树深度
   */
  depth: number;

  /**
   * 是否为叶子结点
   */
  leaf: boolean;

  /**
   * 树路径
   */
  path: string;
}

// 树平展结构
export interface Expand extends TreeNode {}

// 树
export interface Tree extends TreeNode {
  /**
   * 父级结点
   */
  parent: Tree;

  /**
   * 子
   */
  children: Tree[];

  /**
   * 拓展属性
   */
  [key: string]: any;
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
 * 通用查询参数
 */
export interface GeneralParams<T extends IdEntity> {
  entity?: T;
  orders?: Order[];
}

export interface Order {
  direction: 'ASC' | 'DESC';
  property: string;
}
/**
 * 通用模板接口定义
 */
export interface GeneralApi<T extends IdEntity> {
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
  list: (params: GeneralParams<T>) => Promise<R<T[]>>;

  /**
   * 分页
   * @param page 分页
   * @param entity 实体
   * @returns page
   */
  page: (
    page: Pagination<T>,
    params: GeneralParams<T>,
  ) => Promise<R<Pagination<T>>>;
}
