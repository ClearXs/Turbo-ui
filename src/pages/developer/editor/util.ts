import { ColumnDef, TableColumn } from '@/api/developer/datasource';
import { DataType, DataView } from './kernel';
import { ColumnType } from '@/components/TForm/interface';
import _ from 'lodash';
import { TableColumnProps } from '@/components/TableCrud/interface';

// initial database datatype mapping to table column type
const DATA_TYPE_MAPPINGS: Map<DataType, ColumnType> = new Map();

DATA_TYPE_MAPPINGS.set('bit', 'number');
DATA_TYPE_MAPPINGS.set('smallint', 'number');
DATA_TYPE_MAPPINGS.set('tinyint', 'number');
DATA_TYPE_MAPPINGS.set('int', 'number');
DATA_TYPE_MAPPINGS.set('int2', 'number');
DATA_TYPE_MAPPINGS.set('int4', 'number');
DATA_TYPE_MAPPINGS.set('int8', 'number');
DATA_TYPE_MAPPINGS.set('bigint', 'number');
DATA_TYPE_MAPPINGS.set('float', 'number');
DATA_TYPE_MAPPINGS.set('float8', 'number');
DATA_TYPE_MAPPINGS.set('number', 'number');
DATA_TYPE_MAPPINGS.set('numeric', 'number');
DATA_TYPE_MAPPINGS.set('float', 'number');
DATA_TYPE_MAPPINGS.set('double', 'number');
DATA_TYPE_MAPPINGS.set('decimal', 'number');

DATA_TYPE_MAPPINGS.set('time', 'time');
DATA_TYPE_MAPPINGS.set('timestamp', 'time');
DATA_TYPE_MAPPINGS.set('date', 'dateRange');

DATA_TYPE_MAPPINGS.set('char', 'input');
DATA_TYPE_MAPPINGS.set('character', 'input');
DATA_TYPE_MAPPINGS.set('varchar', 'input');
DATA_TYPE_MAPPINGS.set('nvarchar', 'input');
DATA_TYPE_MAPPINGS.set('longvarchar', 'input');
DATA_TYPE_MAPPINGS.set('longnvarchar', 'input');
DATA_TYPE_MAPPINGS.set('varbinary', 'input');

DATA_TYPE_MAPPINGS.set('text', 'textarea');
DATA_TYPE_MAPPINGS.set('object', 'jsonObject');
DATA_TYPE_MAPPINGS.set('array', 'jsonArray');

/**
 * from {@code TableColumn} transform to {@code DataView}
 *
 * @param tableColumns the {@code TableColumn}
 * @returns DataView
 */
const transformToDataView = (tableColumn: TableColumn): DataView => {
  return {
    id: 'id',
    mode: 'page',
    height: 'auto',
    dataSource: [],
    columns: transformToTableColumnProps(tableColumn.columnDefs),
    search: {
      show: true,
      showSearch: true,
      showReset: true,
    },
    toolbar: {
      show: true,
      showAdd: true,
      showBatchDelete: true,
      showRefresh: true,
      showExport: true,
      showImport: true,
      showColumns: true,
      showOrdered: true,
    },
    operateBar: {
      showEdit: true,
      showCopy: true,
      showDelete: true,
      showDetails: true,
    },
  };
};

/**
 * from {@code ColumnDef[]} transform to table column props
 *
 * @param columnDefs
 * @returns TableColumnProps array
 */
const transformToTableColumnProps = (
  columnDefs: ColumnDef[],
): TableColumnProps<any>[] => {
  return columnDefs.map((column) => {
    return {
      field: _.camelCase(column.dslName),
      label: column.comment,
      type:
        DATA_TYPE_MAPPINGS.get(column.dataType?.dslType.name as DataType) ||
        'input',
    };
  });
};

export { transformToDataView };
