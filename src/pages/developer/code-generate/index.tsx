import CodeGeneratorHelper from './helper';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/binary';
import TreePanel from '@/components/tree/TreePanel';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import { useState } from 'react';
import useCodeGenerateApi, { CodeGenerate } from '@/api/developer/codeGenerate';
import { tryGetIcon } from '@/components/icon';
import App from '@/components/app';
import { Toast } from '@douyinfe/semi-ui';
import PreviewCodeContent from './PreviewCodeContent';
import { open } from '@/util/auth';

const CodeGenerateComponent = () => {
  const [categoryId, setCategoryId] = useState<string>();
  const codeGenerateApi = useCodeGenerateApi();
  const { sliderSide } = App.useApp();

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
            modal={{ closeOnEsc: false }}
            columns={CodeGeneratorHelper.getColumns()}
            useApi={CodeGeneratorHelper.getApi}
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
              append: [
                {
                  code: 'preview',
                  name: '预览',
                  icon: tryGetIcon('IconEyeOpened'),
                  type: 'primary',
                  onClick(tableContext, formContext, value) {
                    codeGenerateApi.preview(value.id).then((res) => {
                      const { code, data, message } = res;
                      if (code === 200) {
                        sliderSide.info({
                          size: 'large',
                          title: value.moduleName,
                          content: (
                            <PreviewCodeContent codeContentList={data} />
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
                  onClick(tableContext, formContext, value) {
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

export default CodeGenerateComponent;
