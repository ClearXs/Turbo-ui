import CodeGenerateTemplateHelper from './helper';
import { CodeGenerateTemplate } from '@/api/developer/codeGenerateTemplate';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/binary';
import TreePanel from '@/components/tree/TreePanel';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import { useState } from 'react';

const CodeGenerateTemplateComponent = () => {
  const [categoryId, setCategoryId] = useState<string>();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'codeTemplate' }}
            addDefaultValue={{ funcCode: 'codeTemplate' }}
            useApi={CategoryHelper.getApi}
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
            useApi={CodeGenerateTemplateHelper.getApi}
            funcCode="codeTemplate"
            params={{ categoryId: categoryId }}
            operateBar={{ showCopy: true }}
          />
        }
      />
    </>
  );
};

export default CodeGenerateTemplateComponent;
