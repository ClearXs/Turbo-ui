import TableCrud from '@/components/TableCrud';
import {
  TableColumnProps,
  TableContext,
} from '@/components/TableCrud/interface';
import { useCallback, useMemo, useRef } from 'react';

export type IFieldColumnTableProps = {
  displayDetails: boolean;
  dataSource: TableColumnProps<any>[];
  getFieldColumnTableApi?: (api: FieldColumnTableApi) => void;
};

export interface FieldColumnTableApi {
  getDataSource: () => TableColumnProps<any>[];
}

const FieldColumnTable: React.FC<IFieldColumnTableProps> = ({
  displayDetails,
  dataSource,
  getFieldColumnTableApi,
}) => {
  const tableContextRef = useRef<TableContext<any>>();

  const api: FieldColumnTableApi = useMemo(() => {
    return {
      getDataSource() {
        return tableContextRef!.current!.dataSource;
      },
    };
  }, [dataSource]);

  getFieldColumnTableApi?.(api);

  const getFieldColumns = useCallback(() => {
    return [
      {
        label: '字段标识',
        field: 'field',
        ellipsis: true,
        align: 'center',
        type: 'input',
        editable: false,
        width: 200,
      },
      {
        label: '字段名称',
        field: 'label',
        ellipsis: true,
        align: 'center',
        type: 'input',
        width: 200,
      },
      {
        label: '字段位置索引',
        field: 'index',
        ellipsis: true,
        align: 'center',
        type: 'number',
        width: 200,
      },
      {
        label: '是否可用',
        field: 'disabled',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: true,
        width: 200,
      },
      {
        label: '是否必填',
        field: 'require',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
        width: 200,
      },
      {
        label: '行分割的数目',
        field: 'span',
        ellipsis: true,
        align: 'center',
        type: 'select',
        initValue: '12',
        optionList: [
          { label: '6', value: '6' },
          { label: '12', value: '12' },
          { label: '24', value: '24' },
        ],
        width: 220,
      },
      {
        label: '是否单独成行',
        field: 'line',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
        editable: false,
      },
      {
        label: '是否在表单中显示',
        field: 'form',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
      },
      {
        label: '是否在表格中显示',
        field: 'table',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
        width: 200,
      },
      {
        label: '是否在搜索中显示',
        field: 'search',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
        width: 200,
      },
    ] as TableColumnProps<any>[];
  }, []);

  return (
    <TableCrud<TableColumnProps<any>>
      id="field"
      mode="list"
      fixed={true}
      height="auto"
      columns={getFieldColumns()}
      dataSource={dataSource}
      disableDefaultBehavior={false}
      search={{ show: false }}
      title="字段列表"
      operateBar={{
        showInlineEdit: !displayDetails,
        showEdit: false,
        showDetails: false,
        showDelete: !displayDetails,
      }}
      toolbar={{
        show: false,
      }}
      getTableContext={(tableContext) =>
        (tableContextRef.current = tableContext)
      }
    />
  );
};

export default FieldColumnTable;
