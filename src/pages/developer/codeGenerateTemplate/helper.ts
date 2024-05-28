import useCodeGenerateTemplateApi, {
  CodeGenerateTemplate,
  CodeGenerateTemplateApi,
} from '@/api/developer/codeGenerateTemplate';
import {
  TableCodeEditorColumnProps,
  TableSelectColumnProps,
} from '@/components/TableCrud/components';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';
import { CodeTemplateDomain } from '@/constant/codeTemplateDomain';
import { CodeTemplateLanguage } from '@/constant/codeTemplateLanguage';
import _ from 'lodash';
import mentions from './mentions';

const CodeGenerateTemplateHelper: Helper<
  CodeGenerateTemplate,
  CodeGenerateTemplateApi
> = {
  getColumns: () => {
    return [
      {
        label: '模板名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '模板语言',
        field: 'language',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        optionList: CodeTemplateLanguage,
        filter: true,
        initValue: 'java',
        reaction: {
          fulfill: {
            run: "$form.setFieldState('content', state => {state.componentProps.language = $self.value})",
          },
        },
      } as TableSelectColumnProps<CodeGenerateTemplate>,
      {
        label: '模板领域',
        field: 'domain',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        optionList: CodeTemplateDomain,
        filter: true,
        initValue: 'frontend',
        search: true,
      } as TableSelectColumnProps<CodeGenerateTemplate>,
      {
        label: '文件名',
        field: 'fileName',
        ellipsis: true,
        align: 'center',
        type: 'codeEditor',
        table: false,
        require: true,
        language: 'shell',
        completion: mentions,
        basicSetup: {
          lineNumbers: false,
        },
      } as TableCodeEditorColumnProps<CodeGenerateTemplate>,
      {
        label: '文件路径',
        field: 'filePath',
        ellipsis: true,
        align: 'center',
        table: false,
        type: 'codeEditor',
        require: true,
        language: 'shell',
        completion: mentions,
        basicSetup: {
          lineNumbers: false,
        },
      } as TableCodeEditorColumnProps<CodeGenerateTemplate>,
      {
        label: '模板内容',
        field: 'content',
        ellipsis: true,
        align: 'center',
        type: 'codeEditor',
        language: 'java',
        require: true,
        line: true,
        completion: mentions,
      } as TableCodeEditorColumnProps<CodeGenerateTemplate>,
    ] as TableColumnProps<CodeGenerateTemplate>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useCodeGenerateTemplateApi,
};

export default CodeGenerateTemplateHelper;
