import { InternalRequest } from '@/hook/request';
import _ from 'lodash';

// 统一返回结构
export interface R<T> {
  code: number;
  message: string;
  data: T;
}

export interface IdEntity {
  // 主键
  id: string;
  [key: string]: any;
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
  createdBy: string;

  /**
   * 更新时间
   */
  updatedTime: Date;

  /**
   * 更新人
   */
  updatedBy: string;

  /**
   * 逻辑删除
   */
  isDeleted: number;

  /**
   * 版本号
   */
  version: number;
}

// 分类实体
export interface CategoryEntity extends BaseEntity {
  /**
   * 分类Id
   */
  categoryId: string;
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

  /**
   * 父节点id
   */
  parentId: string;
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
  current: string;
  // 页大小
  size: string;
  // 总数
  total?: string;
  // 数据
  records?: T[];
}

// 通用查询参数
export interface GeneralParams<T extends IdEntity> {
  entity?: Partial<T>;
  orders?: Order[];
}

export interface Order {
  direction: 'ASC' | 'DESC';
  property: string;
}

export interface Term {
  field: string;
  value: string;
}

// 构建远程查询
interface RemoteQueryParam {
  // 查询条件
  terms: Term[];
  // 排序
  orders: Order[];
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
   * 保存或者更新
   * @param entity 实体
   * @returns true or false
   */
  saveOrUpdate: (entity: T) => Promise<R<boolean>>;

  /**
   * 批量保存或者更新
   * @param entity 实体
   * @returns true or false
   */
  batchSaveOrUpdate: (entity: T[]) => Promise<R<boolean>>;

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
  details: (string: string) => Promise<R<T & { [key: string]: any }>>;

  /**
   * 导入
   * @param id id
   * @returns true or false
   */
  import: (file: any) => Promise<R<boolean>>;

  /**
   * 导出
   * @param id id
   * @returns 实体 or null
   */
  export: (params?: GeneralParams<T>) => Promise<any>;

  /**
   * 列表
   * @param entity 用于过滤实体
   * @returns list
   */
  list: (params?: GeneralParams<T>) => Promise<R<T[]>>;

  /**
   * 分页
   * @param page 分页
   * @param entity 实体
   * @returns page
   */
  page: (
    page: Pagination<T>,
    params?: GeneralParams<T>,
  ) => Promise<R<Pagination<T>>>;
}

export class GeneralApiImpl<T extends IdEntity> implements GeneralApi<T> {
  constructor(
    protected apiPath: string,
    protected request: InternalRequest,
  ) {
    if (_.isEmpty(apiPath) || _.isEmpty(request)) {
      throw new Error('api path must not empty or request must not null');
    }
    if (!apiPath.startsWith('/api')) {
      throw new Error('api path must start with /api');
    }
  }

  save(entity: T): Promise<R<boolean>> {
    return this.request.post(this.apiPath + '/save', entity).then((res) => {
      return res.data;
    });
  }

  edit(entity: T): Promise<R<boolean>> {
    return this.request.put(this.apiPath + '/edit', entity).then((res) => {
      return res.data;
    });
  }

  saveOrUpdate(entity: T): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + '/save-or-update', entity)
      .then((res) => {
        return res.data;
      });
  }

  batchSaveOrUpdate(entity: T[]): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + '/batch-save-or-update', entity)
      .then((res) => {
        return res.data;
      });
  }

  deleteEntity(ids: string[]): Promise<R<boolean>> {
    return this.request.delete(this.apiPath + '/delete', ids).then((res) => {
      return res.data;
    });
  }

  details(id: string): Promise<R<T & { [key: string]: any }>> {
    return this.request.get(this.apiPath + '/details', { id }).then((res) => {
      return res.data;
    });
  }

  /**
   * 导入
   * @param id id
   * @returns true or false
   */
  import(file: any): Promise<R<boolean>> {
    return this.request.post(this.apiPath + '/import', { file }).then((res) => {
      return res.data;
    });
  }

  /**
   * 导出
   * @param id id
   * @returns 实体 or null
   */
  export(params?: GeneralParams<T>): Promise<any> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request.post(this.apiPath + '/export', { ...queryParam });
  }

  list(params?: GeneralParams<T>): Promise<R<T[]>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + '/list', { ...queryParam })
      .then((res) => {
        return res.data;
      });
  }
  page(
    page: Pagination<T>,
    params?: GeneralParams<T>,
  ): Promise<R<Pagination<T>>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + '/page', { page, ...queryParam })
      .then((res) => {
        return res.data;
      });
  }

  protected buildRemoteQueryParam<T extends IdEntity>(
    general?: GeneralParams<T>,
  ): RemoteQueryParam {
    const terms: Term[] = [];
    const entity = general?.entity;
    if (entity) {
      for (const key in entity) {
        const value = entity[key];
        if (!_.isEmpty(value)) {
          terms.push({ field: key, value });
        }
      }
    }
    return { terms, orders: general?.orders || [] };
  }
}

export interface TreeGeneralApi<T extends Tree> extends GeneralApi<T> {
  /**
   * 列表
   * @param entity 用于过滤实体
   * @returns list
   */
  tree: (params?: GeneralParams<T>) => Promise<R<T[]>>;
}

export class TreeGeneralApiImpl<T extends Tree>
  extends GeneralApiImpl<T>
  implements TreeGeneralApi<T>
{
  tree(params: GeneralParams<T> = {}): Promise<R<T[]>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + '/tree', { ...queryParam })
      .then((res) => {
        return res.data;
      });
  }
}
