import useRequest from '@/hook/request';
import { BaseEntity, CategoryEntity, GeneralApi, GeneralApiImpl } from '..';

export interface CodeGenerateTemplate extends BaseEntity, CategoryEntity {
  /**
   * 名称
   */
  name: string;

  /**
   * 模板内容
   */
  content: string;

  /**
   * 模板语言
   */
  language: string;

  /**
   * 模板领域
   */
  domain: string;
  /**
   * 文件名
   */
  fileName: string;
  /**
   * 文件路径
   */
  filePath: string;
}

export interface CodeGenerateTemplateApi
  extends GeneralApi<CodeGenerateTemplate> {}

class CodeGenerateTemplateApiImpl extends GeneralApiImpl<CodeGenerateTemplate> {}

export default function useCodeGenerateTemplateApi(): CodeGenerateTemplateApi {
  const request = useRequest();
  return new CodeGenerateTemplateApiImpl(
    '/api/dev/code/generate/template',
    request,
  );
}
