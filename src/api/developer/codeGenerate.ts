import useRequest from '@/hook/useRequest';
import { BaseEntity, CategoryEntity, GeneralApi, GeneralApiImpl, R } from '..';
import { CodeGenerateTemplate } from './codeGenerateTemplate';
import { LanguageName } from '@uiw/codemirror-extensions-langs';
import { TableColumn } from './datasource';

export interface CodeGenerate extends BaseEntity, CategoryEntity {
  /**
   * 模板集合
   */
  templateCategoryId: string;

  /**
   * 模块名称
   */
  instanceName: string;

  /**
   * 模块Key
   */
  instanceKey: string;

  /**
   * 模块请求路径
   */
  requestPath: string;

  /**
   * 版本号
   */
  instanceVersion: string;

  /**
   * 作者
   */
  author: string;

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
   * ddl
   */
  ddl: string;

  /**
   * ddlDb
   */
  ddlDb: string;

  /**
   * 数据视图
   */
  dataView: string;

  /**
   * 分类ID;子系统分类
   */
  categoryId: string;

  /**
   * 是否忽略常用字段
   */
  ignoreDefaultField: boolean;
}

export interface CodeContent {
  filename: string;
  content: string;
  language: LanguageName;
  template: CodeGenerateTemplate;
}

export interface CodeGenerateApi extends GeneralApi<CodeGenerate> {
  parseDDL: (ddlText: string, engine: string) => Promise<R<TableColumn>>;
  preview: (id: string) => Promise<R<CodeContent[]>>;
  generate: (id: string) => Promise<void>;
}

class CodeGenerateApiImpl
  extends GeneralApiImpl<CodeGenerate>
  implements CodeGenerateApi
{
  parseDDL(ddlText: string, engine: string): Promise<R<TableColumn>> {
    return this.request
      .post(this.apiPath + '/parse-ddl', { ddlText, engine })
      .then((res) => res.data);
  }

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
