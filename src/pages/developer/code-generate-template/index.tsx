import CodeGenerateTemplateHelper from './helper';
import { CodeGenerateTemplate } from '@/api/developer/codeGenerateTemplate';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/binary';
import TreePanel from '@/components/tree/TreePanel';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import { useState } from 'react';

const CodeGenerateTemplatePage = () => {
  const [categoryId, setCategoryId] = useState<string>();
  const codeGenerateTemplateApi = CodeGenerateTemplateHelper.getApi();
  const categoryApi = CategoryHelper.getApi();

  return (
    <Binary
      LeftComponent={
        <TreePanel<CategoryTree>
          columns={CategoryHelper.getColumns()}
          params={{ funcCode: 'codeTemplate' }}
          addDefaultValue={{ funcCode: 'codeTemplate' }}
          useApi={categoryApi}
          onSelectChange={setCategoryId}
          depth={0}
          root="模板分类"
          expandAll
          first={false}
        />
      }
      RightComponent={
        <CategoryTableCrud<CodeGenerateTemplate>
          mode="page"
          columns={CodeGenerateTemplateHelper.getColumns()}
          useApi={codeGenerateTemplateApi}
          funcCode="codeTemplate"
          params={{ categoryId: categoryId }}
          operateBar={{ showCopy: true }}
        />
      }
    />
  );
};

export default CodeGenerateTemplatePage;
