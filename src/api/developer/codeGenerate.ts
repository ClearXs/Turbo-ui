import useRequest from '@/hook/request';
import { BaseEntity, CategoryEntity, GeneralApi, GeneralApiImpl, R } from '..';
import { CodeGenerateTemplate } from './codeGenerateTemplate';
import { LanguageName } from '@uiw/codemirror-extensions-langs';

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

export interface CodeContent {
  filename: string;
  content: string;
  language: LanguageName;
  template: CodeGenerateTemplate;
}

export interface CodeGenerateApi extends GeneralApi<CodeGenerate> {
  preview: (id: string) => Promise<R<CodeContent[]>>;
  generate: (id: string) => Promise<void>;
}

class CodeGenerateApiImpl
  extends GeneralApiImpl<CodeGenerate>
  implements CodeGenerateApi
{
  preview(id: string): Promise<R<CodeContent[]>> {
    return this.request
      .get(this.apiPath + `/preview/${id}`)
      .then((res) => res.data);
  }

  generate(id: string): Promise<void> {
    return this.request.get(this.apiPath + `/generate/${id}`).then();
  }
}

export default function useCodeGenerateApi(): CodeGenerateApi {
  const request = useRequest();
  return new CodeGenerateApiImpl('/api/dev/code/generate', request);
}
