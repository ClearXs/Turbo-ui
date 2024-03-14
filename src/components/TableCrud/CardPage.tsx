import { IdEntity } from '@/api/interface';
import { TableContext, TableCrudProps } from './interface';
import {
  Card,
  CardGroup,
  Checkbox,
  Col,
  Row,
  Spin,
  Typography,
} from '@douyinfe/semi-ui';
import _ from 'lodash';
import { directGetIcon } from '../Icon/shared';
import { FormContext } from '../TForm/interface';
import OperatorButtonSet from './OperatorButtonSet';
import useTableCrudOperatorBar from './TableCrudOperatorBar';
import TablePagination from './TablePagination';
import { useContext } from 'react';
import { TableCrudContext } from './context/table';
import { TFormContext } from '../TForm/context/form';
import { observer } from '@formily/reactive-react';

export type CardPageProps<T extends IdEntity> = {
  tableProps: TableCrudProps<T>;
};

const CardPage = observer(<T extends IdEntity>(props: CardPageProps<T>) => {
  const renderOperatorBars = useTableCrudOperatorBar<T>();
  const tableContext = useContext<TableContext<T>>(TableCrudContext);
  const formContext = useContext<FormContext<T>>(TFormContext);

  const {
    mode,
    dataSource = [],
    table: { pagination: { total, currentPage, pageSize }, selectedRowKeys } = {
      pagination: { total: 0, currentPage: 1, pageSize: 10 },
      selectedRowKeys: [],
    },
  } = tableContext || {};
  const { card } = props.tableProps || {};

  const tableColumns = [...(tableContext.getTableColumns(true) || [])];

  // 取card标题column
  // 1.判断col中的title属性
  // 2.判断是否有'name'的col
  // 3.取第一个col
  const titleColumn =
    tableColumns.find((col) => {
      if (Object.hasOwn(col, 'cardTitle')) {
        return col['cardTitle'];
      }
      if (Object.hasOwn(col, 'name')) {
        return col;
      }
      return undefined;
    }) || tableColumns[0];

  // 取内容区columns
  const contentColumns = tableColumns
    .filter((col) => col.field !== titleColumn.field)
    .slice(0, 4);
  return (
    <Spin spinning={tableContext.table.loading}>
      <CardGroup spacing={10} style={{ maxHeight: '65vh', overflowY: 'auto' }}>
        <div
          onClick={() => {
            formContext.visible = true;
            formContext.loading = false;
            formContext.type = 'add';
          }}
        >
          <Card
            title
            className="bg-gray-400"
            shadows="hover"
            headerLine={false}
            header
            style={{
              width: 230,
              height: 180,
              backgroundColor: '#fbfdff',
              borderStyle: 'dashed',
              borderRadius: '10px',
            }}
          >
            <div className="text-center">
              <Typography.Title type="tertiary" heading={6}>
                <div className="flex gap-2 items-center justify-center">
                  {directGetIcon('IconCopyAdd')}
                  新增
                </div>
              </Typography.Title>
            </div>
          </Card>
        </div>
        {dataSource.map((data, idx) => {
          const bars = renderOperatorBars(
            data,
            props.tableProps['operateBar'],
            tableContext.tableApi,
          );
          const cardChecked =
            selectedRowKeys.findIndex((record) => record === data.id) > -1;
          return (
            <Card
              key={idx}
              shadows="hover"
              headerStyle={{ padding: '8px', height: '15%' }}
              header={
                <div className="flex gap-2 items-center">
                  {directGetIcon('IconGridStroked')}
                  {card?.renderTitle?.(data) || (
                    <Typography.Title
                      heading={6}
                      ellipsis={{
                        showTooltip: {
                          opts: { content: data[titleColumn.field] },
                        },
                      }}
                    >
                      {data[titleColumn.field]}
                    </Typography.Title>
                  )}
                  {
                    <Checkbox
                      checked={cardChecked}
                      className="ml-auto"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        let selectedRowKeys = [
                          ...(tableContext.table.selectedRowKeys || []),
                        ];
                        if (checked) {
                          selectedRowKeys.push(data.id);
                        } else {
                          selectedRowKeys = selectedRowKeys.filter(
                            (key) => key !== data?.id,
                          );
                        }
                        tableContext.table.selectedRowKeys = selectedRowKeys;
                      }}
                    />
                  }
                </div>
              }
              headerLine={false}
              style={{
                width: 230,
                height: 180,
                borderStyle: 'dashed',
                borderRadius: '10px',
              }}
              footer={
                <div className="flex items-center">
                  {card?.renderFooter?.(data) ||
                    (Object.hasOwn(data, 'createdTime') && (
                      <Typography.Text
                        type="tertiary"
                        size="small"
                        className="p-2"
                      >
                        {data['createdTime']}
                      </Typography.Text>
                    ))}
                  <OperatorButtonSet<T>
                    bars={bars}
                    record={data}
                    mode="shrink"
                    className="ml-auto"
                  />
                </div>
              }
              bodyStyle={{ height: '75%', padding: '5px' }}
              footerStyle={{
                position: 'relative',
                padding: '0px',
                right: '0px',
                bottom: '15px',
              }}
            >
              <div onClick={() => card?.onClick?.(data)}>
                {card?.renderContent?.(data) || (
                  <div className="p-2">
                    {contentColumns.map((col, idx) => {
                      const value = data[col.field];
                      const Content = tableContext.decorator
                        .wrap(col)
                        .render?.(col.label, data, idx) || (
                        <Typography.Text
                          type="tertiary"
                          ellipsis={{
                            showTooltip: {
                              opts: { content: String(value) },
                            },
                          }}
                        >
                          {value}
                        </Typography.Text>
                      );
                      return (
                        <Row key={idx}>
                          <Col span={10}>
                            <Typography.Text
                              type="tertiary"
                              ellipsis={{
                                showTooltip: {
                                  opts: { content: col.label },
                                },
                              }}
                            >
                              {col.label}:
                            </Typography.Text>
                          </Col>
                          <Col span={14}>{Content}</Col>
                        </Row>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </CardGroup>
      {mode !== 'tree' && (
        <TablePagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      )}
    </Spin>
  );
});

export default CardPage;
