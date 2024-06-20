import useCodeGenerateApi, {
  CodeGenerate,
  CodeGenerateApi,
} from '@/api/developer/codeGenerate';
import {
  TableCascadeColumnProps,
  TableSelectColumnProps,
  TableSlotColumnProps,
} from '@/components/TableCrud/components';
import {
  TableColumnProps,
  TableContext,
} from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';
import { CodeGenerateSource } from '@/constant/codeGenerateSource';
import { Button } from '@douyinfe/semi-ui';
import _ from 'lodash';
import CodeGenerateEditor from './editor';
import { FormContext } from '@/components/TForm/interface';
import useDataSourceApi from '@/api/developer/datasource';
import { FormJsonObjectColumnProps } from '@/components/TForm/components';
import { useRunScope } from '@/components/TForm/formily/scope/run';
import { transformToDataView } from '../editor/util';
import usePageApi from '@/api/developer/page';
import App from '@/components/App';

const CodeGeneratorHelper: Helper<CodeGenerate, CodeGenerateApi> = {
  getColumns: () => {
    const runScope = useRunScope();
    const dataSourceApi = useDataSourceApi();
    const pageApi = usePageApi();
    const { sliderSide } = App.useApp();

    return [
      {
        label: '模块名称',
        field: 'moduleName',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '模块Key',
        field: 'moduleKey',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        table: false,
      },
      {
        label: '模块包路径',
        field: 'modulePackagePath',
        ellipsis: true,
        table: false,
        align: 'center',
        type: 'input',
        require: true,
        extraText: '比如：/code',
      },
      {
        label: '模块请求路径',
        field: 'moduleRequestPath',
        ellipsis: true,
        table: false,
        align: 'center',
        type: 'input',
        require: true,
        extraText: '比如：/dev/code/generate',
      },
      {
        label: '模块版本号',
        field: 'moduleVersion',
        ellipsis: true,
        table: false,
        align: 'center',
        type: 'input',
      },
      {
        label: '作者',
        field: 'moduleAuthor',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
      {
        label: '模板集',
        field: 'templateCategoryId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        table: false,
        showClear: true,
        remote: {
          url: '/api/sys/category/list',
          params: [
            {
              key: 'terms',
              value: [{ field: 'funcCode', value: 'codeTemplate' }],
            },
          ],
        },
      } as TableSelectColumnProps<CodeGenerate>,
      {
        label: '来源',
        field: 'source',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        optionList: CodeGenerateSource,
        filter: true,
        initValue: 'datatable',
        search: true,
      } as TableSelectColumnProps<CodeGenerate>,
      {
        label: '数据页面',
        field: 'pageId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        table: false,
        showClear: true,
        remote: {
          url: '/api/dev/page/list',
        },
        reaction: {
          dependencies: ['source'],
          fulfill: {
            schema: {
              'x-visible': "{{$deps[0] === 'page'}}",
            },
          },
        },
      } as TableSelectColumnProps<CodeGenerate>,
      {
        label: '数据实体',
        field: 'datatable',
        ellipsis: true,
        align: 'center',
        type: 'jsonObject',
        line: true,
        require: true,
        table: false,
        columns: [
          {
            label: '数据源',
            field: 'dataSource',
            align: 'center',
            type: 'select',
            initValue: true,
            remote: {
              url: '/api/dev/datasource/list',
            },
          } as TableSelectColumnProps<CodeGenerate>,
          {
            label: '实体表',
            field: 'table',
            ellipsis: true,
            align: 'center',
            type: 'select',
            require: true,
            table: false,
            reaction: {
              dependencies: ['datatable.dataSource'],
              fulfill: {
                run: runScope.setFieldStateList({
                  path: 'datatable.table',
                  func: (form, field, formContext, args) => {
                    const maybeDataSourceId = args && args[0];
                    if (!_.isEmpty(maybeDataSourceId)) {
                      dataSourceApi
                        .showTables(maybeDataSourceId)
                        .then((res) => {
                          const { code, data } = res;
                          if (code === 200) {
                            field.setDataSource(
                              data.map((table) => {
                                return {
                                  label: table.tableName,
                                  value: table.tableName,
                                };
                              }),
                            );
                          }
                        });
                    }
                  },
                }),
              },
            },
          } as TableCascadeColumnProps<CodeGenerate>,
        ],
        reaction: {
          dependencies: ['source'],
          fulfill: {
            schema: {
              'x-visible': "{{$deps[0] === 'datatable'}}",
            },
          },
        },
      } as FormJsonObjectColumnProps<CodeGenerate>,
      {
        label: '数据视图',
        field: 'dataView',
        ellipsis: true,
        align: 'center',
        type: 'slot',
        shown: (
          <Button theme="borderless" type="primary" block>
            查看
          </Button>
        ),
        component: (formContext: FormContext<any>) => {
          let dataView: DataView = formContext.getValue('dataView');
          try {
            const maybeStringDataView = dataView;
            dataView = JSON.parse(maybeStringDataView);
          } catch (err) {}
          return (
            <CodeGenerateEditor
              formContext={formContext}
              dataView={dataView}
              displayDetails={formContext.type === 'details'}
            />
          );
        },
        reaction: {
          dependencies: ['datatable.table', 'pageId'],
          fulfill: {
            run: runScope.setFieldState({
              path: 'dataView',
              func: (form, field, formContext, deps) => {
                const tableName = deps?.[0];
                const pageId = deps?.[1];
                if (!_.isEmpty(tableName)) {
                  const values = formContext.getValues() as CodeGenerate;
                  dataSourceApi
                    .showTable(
                      values.datatable['dataSource'],
                      values.datatable['table'],
                    )
                    .then((res) => {
                      const { code, data } = res;
                      if (code === 200) {
                        // transform to data view
                        const dataView = transformToDataView(data);
                        formContext.setValue('dataView', dataView);
                      }
                    });
                }
                if (!_.isEmpty(pageId)) {
                  pageApi.details(pageId).then((res) => {
                    const { code, data } = res;
                    if (code === 200) {
                      formContext.setValue('dataView', data.dataview);
                    }
                  });
                }
              },
            }),
          },
        },
        render: (text, record, index, tableContext) => {
          return (
            <Button
              theme="borderless"
              type="primary"
              block
              onClick={() => {
                const formContext = (tableContext as TableContext<any>)
                  .formContext;
                const dataView: string = record.dataView;
                sliderSide.show({
                  showConfirm: false,
                  content: (
                    <CodeGenerateEditor
                      formContext={formContext!}
                      dataView={JSON.parse(dataView)}
                      displayDetails={true}
                    />
                  ),
                  size: 'large',
                });
              }}
            >
              查看
            </Button>
          );
        },
      } as TableSlotColumnProps<CodeGenerate>,
    ] as TableColumnProps<CodeGenerate>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useCodeGenerateApi,
};

export default CodeGeneratorHelper;
