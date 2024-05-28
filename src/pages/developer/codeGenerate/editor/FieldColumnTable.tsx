import TableCrud from '@/components/TableCrud';
import {
  TableColumnProps,
  TableContext,
} from '@/components/TableCrud/interface';
import { useCallback, useRef } from 'react';

export type IFieldColumnTableProps = {
  dataSource: TableColumnProps<any>[];
};

const FieldColumnTable: React.FC<IFieldColumnTableProps> = ({ dataSource }) => {
  const tableContextRef = useRef<TableContext<any>>();
  const getFieldColumns = useCallback(() => {
    return [
      {
        label: '字段标识',
        field: 'field',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '字段名称',
        field: 'label',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '字段位置索引',
        field: 'index',
        ellipsis: true,
        align: 'center',
        type: 'number',
      },
      {
        label: '是否可用',
        field: 'disabled',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: true,
      },
      {
        label: '是否必填',
        field: 'require',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
      },
      {
        label: '行分割的数目',
        field: 'span',
        ellipsis: true,
        align: 'center',
        type: 'checkbox',
        initValue: '12',
        options: [
          { label: '6', value: '6' },
          { label: '12', value: '12' },
          { label: '24', value: '24' },
        ],
      },
      {
        label: '是否单独成行',
        field: 'line',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
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
      },
      {
        label: '是否在搜索中显示',
        field: 'search',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        initValue: false,
      },
    ] as TableColumnProps<any>[];
  }, []);

  return (
    <TableCrud<TableColumnProps<any>>
      mode="list"
      columns={getFieldColumns()}
      dataSource={dataSource}
      search={{ show: false }}
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
