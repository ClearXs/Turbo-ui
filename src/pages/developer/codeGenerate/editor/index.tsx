import { CodeGenerate } from '@/api/developer/codeGenerate';
import TForm from '@/components/TForm/TForm';
import { FormColumnProps, FormContext } from '@/components/TForm/interface';
import { useCallback, useMemo } from 'react';
import { DataView } from '../../editor/kernel';
import viewMode from '../../editor/panel/DataViewForm/constant/viewMode';
import {
  FormJsonObjectColumnProps,
  Handler,
  SlotComponentProps,
} from '@/components/TForm/components';
import FieldColumnTable from './FieldColumnTable';

export type ICodeGenerateEditorProps = SlotComponentProps & {
  formContext: FormContext<CodeGenerate>;
  dataView: DataView;
};

const CodeGenerateEditor: React.FC<ICodeGenerateEditorProps> = ({
  formContext,
  getHandler,
  dataView,
}) => {
  const getDataViewColumns = useCallback(() => {
    return [
      {
        label: '视图id',
        field: 'id',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        initValue: 'id',
      },
      {
        label: '视图模式',
        field: 'mode',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        optionList: viewMode,
      },
      {
        label: '工具栏',
        field: 'toolbar',
        ellipsis: true,
        align: 'center',
        type: 'jsonObject',
        line: true,
        columns: [
          {
            label: '是否显示增加按钮',
            field: 'showAdd',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否显示批量删除',
            field: 'showBatchDelete',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否显示导出',
            field: 'showExport',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否显示导入',
            field: 'showImport',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否展示显示列',
            field: 'showColumns',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否展示排序',
            field: 'showOrdered',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
        ],
      } as FormJsonObjectColumnProps<DataView>,
      {
        label: '操作栏',
        field: 'operateBar',
        ellipsis: true,
        align: 'center',
        type: 'jsonObject',
        line: true,
        columns: [
          {
            label: '是否显示编辑',
            field: 'showEdit',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否显示删除',
            field: 'showDelete',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
          {
            label: '是否显示详情',
            field: 'showDetails',
            align: 'center',
            type: 'switch',
            initValue: true,
          },
        ],
      } as FormJsonObjectColumnProps<DataView>,
      {
        label: '初始化参数',
        field: 'params',
        ellipsis: true,
        align: 'center',
        type: 'jsonArray',
        form: true,
        line: true,
        columns: [
          {
            label: '变量Key',
            field: 'key',
            ellipsis: true,
            align: 'center',
            type: 'input',
          },
          {
            label: '默认值',
            field: 'defaultValue',
            ellipsis: true,
            align: 'center',
            type: 'input',
          },
        ],
      } as FormJsonObjectColumnProps<any>,
    ] as FormColumnProps<DataView>[];
  }, [formContext]);

  const handler = useMemo<Handler>(() => {
    return { onOk: () => {}, onCancel: () => [] };
  }, [formContext]);
  getHandler?.(handler);

  return (
    <div className="h-[100%]">
      <TForm<DataView>
        mode="simply"
        modal={{ abandon: true }}
        columns={getDataViewColumns()}
        params={dataView}
        slotBottom={<FieldColumnTable dataSource={dataView.columns} />}
      />
    </div>
  );
};

export default CodeGenerateEditor;
