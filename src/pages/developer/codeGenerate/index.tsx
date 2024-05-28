import CodeGeneratorHelper from './helper';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/Binary';
import TreePanel from '@/components/Tree/TreePanel';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import { useState } from 'react';
import { CodeGenerate } from '@/api/developer/codeGenerate';
import { tryGetIcon } from '@/components/Icon';

const CodeGenerateComponent = () => {
  const [categoryId, setCategoryId] = useState<string>();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'codeGenerate' }}
            addDefaultValue={{ funcCode: 'codeGenerate' }}
            useApi={CategoryHelper.getApi}
            onSelectChange={setCategoryId}
            depth={0}
            root="子系统分类"
            expandAll
            first={false}
          />
        }
        RightComponent={
          <CategoryTableCrud<CodeGenerate>
            mode="page"
            columns={CodeGeneratorHelper.getColumns()}
            useApi={CodeGeneratorHelper.getApi}
            funcCode="codeGenerate"
            params={{ categoryId: categoryId }}
            scope={CodeGeneratorHelper.getScope?.()}
            operateBar={{
              append: [
                {
                  code: 'preview',
                  name: '预览',
                  icon: tryGetIcon('IconEyeOpened'),
                  type: 'primary',
                },
                {
                  code: 'generate',
                  name: '生成',
                  icon: tryGetIcon('IconGenerate'),
                  type: 'primary',
                },
                {
                  code: 'translate',
                  name: '转换页面',
                  icon: tryGetIcon('IconPageSetting'),
                  type: 'primary',
                },
              ],
            }}
          />
        }
      />
    </>
  );
};

export default CodeGenerateComponent;
