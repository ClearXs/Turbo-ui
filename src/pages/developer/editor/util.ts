import { TableColumn } from '@/api/developer/datasource';
import { DataType, DataView } from './kernel';
import { ColumnType } from '@/components/uni-form/interface';
import _ from 'lodash';
import { BoSchema } from '@clearx/designable-core';
import { from } from '@/components/uni-form/formily/schema';

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

export default {
  /**
   * from {@code TableColumn} transform to {@code DataView}
   *
   * @param tableColumns the {@code TableColumn}
   * @returns DataView
   */
  transformToDataViewFormTableColumn: (tableColumn: TableColumn): DataView => {
    return {
      id: 'id',
      mode: 'page',
      height: 'auto',
      dataSource: [],
      columns: tableColumn.columnDefs.map((column) => {
        return {
          field: _.camelCase(column.dslName),
          label: column.comment,
          type:
            DATA_TYPE_MAPPINGS.get(column.dataType?.dslType.name as DataType) ||
            'input',
        };
      }),
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
  },

  /**
   * from {@code BoSchema} transform to {@code DataView}
   *
   * @param schema the {@code BoSchema}
   * @returns DataView
   */
  transformToDataViewFormBoSchema: (schema: BoSchema): DataView => {
    return {
      id: 'id',
      mode: 'page',
      height: 'auto',
      dataSource: [],
      columns: from(schema),
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
  },
};
