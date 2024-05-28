import useRequest from '@/hook/request';
import { BaseEntity, CategoryEntity, GeneralApi, GeneralApiImpl } from '..';

export interface CodeGenerate extends BaseEntity, CategoryEntity {
  /**
   * 模板集合
   */
  templateCategoryId: string;

  /**
   * 模块名称
   */
  moduleName: string;

  /**
   * 模块Key
   */
  moduleKey: string;

  /**
   * 模块包路径
   */
  modulePackagePath: string;

  /**
   * 模块请求路径
   */
  moduleRequestPath: string;

  /**
   * 版本号
   */
  moduleVersion: string;

  /**
   * 作者
   */
  moduleAuthor: string;

  /**
   * 所属子系统KEY
   */
  system: string;

  /**
   * 来源;实体表、数据集
   */
  source: string;

  /**
   * 数据页面ID
   */
  pageId: string;

  /**
   * 实体表;实体表标识
   */
  datatable: {
    dataSource: string;
    table: string;
  };

  /**
   * 数据视图
   */
  dataView: string;

  /**
   * 分类ID;子系统分类
   */
  categoryId: string;
}

export interface CodeGenerateApi extends GeneralApi<CodeGenerate> {}

class CodeGenerateApiImpl extends GeneralApiImpl<CodeGenerate> {}

export default function useCodeGenerateApi(): CodeGenerateApi {
  const request = useRequest();
  return new CodeGenerateApiImpl('/api/dev/code/generate', request);
}
