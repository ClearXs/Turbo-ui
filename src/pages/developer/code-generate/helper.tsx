import useCodeGenerateApi, {
  CodeGenerate,
  CodeGenerateApi,
} from '@/api/developer/codeGenerate';
import {
  TableSelectColumnProps,
  TableSlotColumnProps,
} from '@/components/table-crud/components';
import {
  TableColumnProps,
  TableContext,
} from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import { CodeGenerateSource } from '@/constant/code-generate-source';
import { Button, TreeSelect } from '@douyinfe/semi-ui';
import _ from 'lodash';
import CodeGenerateEditor from './editor';
import { FormContext } from '@/components/uni-form/interface';
import useDataSourceApi from '@/api/developer/datasource';
import { FormJsonObjectColumnProps } from '@/components/uni-form/components';
import * as editorUtils from '../editor/util';
import usePageApi from '@/api/developer/page';
import App from '@/components/app';
import useReaction from '@/components/uni-form/formily/reaction';
import useBoApi from '@/api/developer/bo';
import CodeEditor from '@/components/code-editor/CodeEditor';
import { getDbTypeTree } from '../datasource/constant';

const CodeGeneratorHelper: Helper<CodeGenerate, CodeGenerateApi> = {
  getColumns: () => {
    const dataSourceApi = useDataSourceApi();
    const pageApi = usePageApi();
    const boApi = useBoApi();
    const codeGenerateApi = useCodeGenerateApi();
    const { sliderSide } = App.useApp();
    const reaction = useReaction<CodeGenerate>();

    return [
      {
        label: '实例名称',
        field: 'instanceName',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '实例Key',
        field: 'instanceKey',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        table: false,
        extraText:
          '比如Generate, 代表生成器,该值影响着生成的Controller、Service等类的名称!(建议采用英文首字母大写)',
        reaction: reaction.setWord('instanceKey', ['instanceName'], 'pinyin'),
      },
      {
        label: '版本号',
        field: 'instanceVersion',
        ellipsis: true,
        table: false,
        align: 'center',
        type: 'input',
      },
      {
        label: '请求路径',
        field: 'requestPath',
        ellipsis: true,
        table: false,
        align: 'center',
        type: 'input',
        require: true,
        line: true,
        extraText: '比如：/dev/code',
      },
      {
        label: '作者',
        field: 'author',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
      {
        label: '是否忽略常用字段',
        field: 'ignoreDefaultField',
        table: false,
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: true,
        extraText: '比如忽略id, createTime, tenantId等系统默认字段',
      },
      {
        label: '子系统',
        field: 'categoryId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        table: false,
        showClear: true,
        line: true,
        remote: {
          url: '/api/sys/category/list',
          params: [
            {
              key: 'terms',
              value: [{ field: 'funcCode', value: 'codeGenerate' }],
            },
          ],
        },
        extraText: '该选项会决定实例所属于的模块!',
      } as TableSelectColumnProps<CodeGenerate>,
      {
        label: '模板集',
        field: 'templateCategoryId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        table: false,
        showClear: true,
        line: true,
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
        filter: true,
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
        label: 'BO对象',
        field: 'boId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        table: false,
        showClear: true,
        filter: true,
        remote: {
          url: '/api/dev/bo/list',
        },
        reaction: {
          dependencies: ['source'],
          fulfill: {
            schema: {
              'x-visible': "{{$deps[0] === 'bo'}}",
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
            filter: true,
            reaction: reaction.setFieldState({
              path: 'datatable.table',
              dependencies: ['datatable.dataSource'],
              effect: (formContext, field, args) => {
                const maybeDataSourceId = args && args[0];
                if (!_.isEmpty(maybeDataSourceId)) {
                  dataSourceApi.showTables(maybeDataSourceId).then((res) => {
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
          } as TableSelectColumnProps<CodeGenerate>,
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
        label: 'ddl',
        field: 'ddl',
        ellipsis: true,
        align: 'center',
        type: 'slot',
        extraText: '请输入创建表语句',
        language: 'sql',
        require: true,
        table: false,
        showClear: true,
        filter: true,
        line: true,
        component: (formContext: FormContext<CodeGenerate>) => {
          // preset ddl db engine
          formContext.setValue('ddlDb', 'PostgreSQL');
          return (
            <div className="flex gap-2 flex-col">
              <CodeEditor
                language="sql"
                height="200px"
                placeholder="请输入创建表语句"
                maxHeight="50%"
                onChange={(text) => {
                  formContext.setValue('ddl', text);
                }}
              />
              <div className="flex gap-2 flex-row ml-auto">
                <TreeSelect
                  treeData={getDbTypeTree()}
                  placeholder="请选择数据库引擎"
                  value="PostgreSQL"
                  expandAll
                  onChange={(value) => {
                    formContext.setValue('ddlDb', value);
                  }}
                ></TreeSelect>
                <Button
                  onClick={() => {
                    codeGenerateApi
                      .parseDDL(
                        formContext.getValue('ddl'),
                        formContext.getValue('ddlDb'),
                      )
                      .then((res) => {
                        const { code, data } = res;
                        if (code === 200) {
                          const dataView =
                            editorUtils.default.transformToDataViewFormTableColumn(
                              data,
                            );
                          formContext.setValue('dataView', dataView);
                        }
                      });
                  }}
                >
                  解析
                </Button>
              </div>
            </div>
          );
        },
        reaction: {
          dependencies: ['source'],
          fulfill: {
            schema: {
              'x-visible': "{{$deps[0] === 'ddl'}}",
            },
          },
        },
      } as TableSlotColumnProps<CodeGenerate>,
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
          const dataView: DataView = formContext.getValue('dataView');
          return (
            <CodeGenerateEditor
              formContext={formContext}
              dataView={dataView}
              displayDetails={formContext.type === 'details'}
            />
          );
        },
        reaction: reaction.setFieldState({
          path: 'dataView',
          dependencies: ['datatable.table', 'pageId', 'boId'],
          effect: (formContext, field, deps) => {
            const tableName = deps?.[0];
            const pageId = deps?.[1];
            const boId = deps?.[2];
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
                    const dataView =
                      editorUtils.default.transformToDataViewFormTableColumn(
                        data,
                      );
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
            if (!_.isEmpty(boId)) {
              boApi.schema(boId).then((res) => {
                const { code, data } = res;
                if (code === 200) {
                  const dataView =
                    editorUtils.default.transformToDataViewFormBoSchema(data);
                  formContext.setValue('dataView', dataView);
                }
              });
            }
          },
        }),
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
