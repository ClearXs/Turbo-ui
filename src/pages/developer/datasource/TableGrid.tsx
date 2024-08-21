import useDataSourceApi, {
  ColumnDef,
  TableColumn,
} from '@/api/developer/datasource';
import Binary from '@/components/binary';
import TableCrud from '@/components/table-crud';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Radio, RadioGroup, Spin, Toast, Typography } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export type ITableGridProps = {
  dataSourceId: string;
  getSelectTable?: (tableColumn: TableColumn) => void;
};

const TableNavigation: React.FC<{
  tableColumns: TableColumn[];
  onChange: (tableColumn: TableColumn) => void;
}> = ({ tableColumns = [], onChange }) => {
  const [chooseTable, setChooseTable] = useState<string>(
    (tableColumns.length > 0 && tableColumns[0].tableName) || '',
  );

  return (
    <div className="h-96">
      <RadioGroup type="pureCard" direction="vertical" value={chooseTable}>
        {tableColumns.map((tableColumn) => {
          return (
            <Radio
              value={tableColumn.tableName}
              extra={tableColumn.table.comment}
              onChange={(e) => {
                setChooseTable(e.target.value);
                onChange(tableColumn);
              }}
            >
              {tableColumn.tableName}
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};

const TableGrid: React.FC<ITableGridProps> = ({ dataSourceId }) => {
  const dataSourceApi = useDataSourceApi();

  const [loading, setLoading] = useState<boolean>(false);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);

  const selectTableColumnRef = useRef<TableColumn>();

  const getColumns = useCallback(() => {
    return [
      {
        field: 'dslName',
        label: '字段名称',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
      {
        field: 'comment',
        label: '字段注释',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
      {
        field: 'dataType',
        label: '字段类型',
        ellipsis: true,
        align: 'center',
        type: 'select',
      },
      {
        label: '是否主键',
        field: 'pk',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: true,
      },
      {
        label: '是否外键',
        field: 'fk',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否非空',
        field: 'nonNull',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否唯一',
        field: 'unique',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        table: false,
      },
      {
        label: '是否默认字段',
        field: 'defaulted',
        ellipsis: true,
        align: 'center',
        type: 'switch',
        line: true,
        form: false,
      },
    ] as TableColumnProps<ColumnDef>[];
  }, [dataSourceId]);

  useEffect(() => {
    setLoading(true);
    dataSourceApi
      .showTables(dataSourceId)
      .then((res) => {
        const { data, code, message } = res;
        if (code === 200) {
          const tableColumns = data;
          setTableColumns(tableColumns);
          tableColumns &&
            tableColumns.length > 0 &&
            setColumnDefs(tableColumns[0].columnDefs);
        } else {
          Toast.error(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataSourceId]);

  return (
    <Spin spinning={loading}>
      <Binary
        LeftComponent={
          <TableNavigation
            tableColumns={tableColumns}
            onChange={(tableColumn) => {
              setColumnDefs(tableColumn.columnDefs);
              selectTableColumnRef.current = tableColumn;
            }}
          />
        }
        RightComponent={
          <div className="flex flex-col gap-1">
            <Typography.Title heading={6}>
              {selectTableColumnRef.current?.tableName}
            </Typography.Title>
            <TableCrud<ColumnDef>
              id="dslName"
              mode="list"
              height="45vh"
              dataSource={columnDefs}
              columns={getColumns()}
              search={{ show: false }}
              toolbar={{
                show: false,
              }}
              operateBar={{
                showEdit: false,
                showDetails: false,
                showInlineEdit: true,
              }}
            />
          </div>
        }
      />
    </Spin>
  );
};

export default TableGrid;
