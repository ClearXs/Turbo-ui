import CodeGeneratorHelper from './helper';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/binary';
import TreePanel from '@/components/tree/TreePanel';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import { useState } from 'react';
import { CodeGenerate } from '@/api/developer/codeGenerate';
import { tryGetIcon } from '@/components/icon';
import App from '@/components/app';
import { Toast } from '@douyinfe/semi-ui';
import PreviewCodeContent from './PreviewCodeContent';
import { open } from '@/util/auth';

const CodeGeneratePage = () => {
  const [categoryId, setCategoryId] = useState<string>();
  const codeGenerateApi = CodeGeneratorHelper.getApi();
  const categoryApi = CategoryHelper.getApi();
  const { sliderSide } = App.useApp();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'codeGenerate' }}
            addDefaultValue={{ funcCode: 'codeGenerate' }}
            useApi={categoryApi}
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
            modal={{ closeOnEsc: false }}
            columns={CodeGeneratorHelper.getColumns()}
            useApi={codeGenerateApi}
            funcCode="codeGenerate"
            params={{ categoryId: categoryId }}
            scope={CodeGeneratorHelper.getScope?.()}
            toolbar={{
              append: [
                {
                  code: 'batchGenerate',
                  name: '批量生成',
                  icon: tryGetIcon('IconGenerate'),
                  type: 'primary',
                  position: 'left',
                  onClick(tableContext, formContext) {
                    const ids = tableContext.getSelectedRowKeys();
                    open(
                      `/api/dev/code/generate/batch-generate/${ids.join(',')}`,
                    );
                  },
                },
              ],
            }}
            operateBar={{
              showCopy: true,
              append: [
                {
                  code: 'preview',
                  name: '预览',
                  icon: tryGetIcon('IconEyeOpened'),
                  type: 'primary',
                  onClick(value, tableContext, formContext) {
                    codeGenerateApi.preview(value.id).then((res) => {
                      const { code, data, message } = res;
                      if (code === 200) {
                        sliderSide.info({
                          width: '50%',
                          title: value.instanceName,
                          content: (
                            <PreviewCodeContent
                              codeContentList={data}
                              codeGenerate={value}
                            />
                          ),
                          showConfirm: false,
                          showCancel: false,
                        });
                      } else {
                        Toast.error(message);
                      }
                    });
                  },
                },
                {
                  code: 'generate',
                  name: '生成',
                  icon: tryGetIcon('IconGenerate'),
                  type: 'primary',
                  onClick(value, tableContext, formContext) {
                    open(`/api/dev/code/generate/generate/${value.id}`);
                  },
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

export default CodeGeneratePage;
