import useCodeGenerateApi, {
  CodeGenerate,
  CodeGenerateApi,
} from '@/api/developer/codeGenerate';
import {
  TableCascadeColumnProps,
  TableSelectColumnProps,
  TableSlotColumnProps,
} from '@/components/TableCrud/components';
import { TableColumnProps } from '@/components/TableCrud/interface';
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

const CodeGeneratorHelper: Helper<CodeGenerate, CodeGenerateApi> = {
  getColumns: () => {
    const runScope = useRunScope();
    const dataSourceApi = useDataSourceApi();
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
      },
      {
        label: '模块请求路径',
        field: 'moduleRequestPath',
        ellipsis: true,
        table: false,
        align: 'center',
        type: 'input',
        require: true,
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
        field: 'domain',
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
          dependencies: ['domain'],
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
                run: runScope.setFieldState(
                  'datatable.table',
                  (form, field, formContext, args) => {
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
                ),
              },
            },
          } as TableCascadeColumnProps<CodeGenerate>,
        ],
        reaction: {
          dependencies: ['domain'],
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
            编辑
          </Button>
        ),
        component: (formContext: FormContext<any>) => {
          const dataView = formContext.getValue('dataView');
          return (
            <CodeGenerateEditor formContext={formContext} dataView={dataView} />
          );
        },
        reaction: {
          dependencies: ['datatable.table'],
          fulfill: {
            run: runScope.setFieldState(
              'dataView',
              (form, filed, formContext, args) => {
                const tableName = args?.[0];
                if (_.isEmpty(tableName)) {
                  return;
                }
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
              },
            ),
          },
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
