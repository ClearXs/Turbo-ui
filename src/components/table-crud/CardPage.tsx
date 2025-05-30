import { Entity } from '@/api';
import { TableCrudProps } from './interface';
import {
  Card,
  CardGroup,
  Checkbox,
  Col,
  Empty,
  Row,
  Spin,
  Typography,
} from '@douyinfe/semi-ui';
import _ from 'lodash';
import { tryGetIcon } from '../icon/shared';
import OperatorButtonSet from './OperatorButtonSet';
import TablePagination from './TablePagination';
import { observer } from 'mobx-react';
import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from '@douyinfe/semi-illustrations';
import { renderOperatorBar } from './TableColumnBuilder';
import useTableCrudContext from './hook/table';

export type CardPageProps<T extends Entity> = {
  tableProps: TableCrudProps<T>;
};

const CardPage = observer(<T extends Entity>(props: CardPageProps<T>) => {
  const tableContext = useTableCrudContext();
  const formContext = tableContext.formContext;

  const {
    mode,
    dataSource = [],
    table: { pagination: { total, currentPage, pageSize }, selectedRowKeys } = {
      pagination: { total: 0, currentPage: 1, pageSize: 10 },
      selectedRowKeys: [],
    },
  } = tableContext || {};
  const { card } = props.tableProps || {};
  let showAdd =
    props.tableProps.toolbar?.showAdd === undefined
      ? true
      : props.tableProps.toolbar?.showAdd;

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

  const isEmpty = !showAdd && dataSource.length == 0;

  return (
    <Spin spinning={tableContext.table.loading}>
      {isEmpty ? (
        <Empty
          image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
          darkModeImage={
            <IllustrationNoContentDark style={{ width: 150, height: 150 }} />
          }
          description="暂无数据"
        />
      ) : (
        <CardGroup
          spacing={10}
          style={{ maxHeight: '65vh', overflowY: 'auto' }}
        >
          {showAdd && (
            <div
              onClick={() => {
                formContext!.visible = true;
                formContext!.loading = false;
                formContext!.type = 'add';
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
                      {tryGetIcon('IconCopyAdd')}
                      新增
                    </div>
                  </Typography.Title>
                </div>
              </Card>
            </div>
          )}
          {dataSource.map((data, idx) => {
            const operatorBarList = renderOperatorBar(data, tableContext);
            const cardChecked =
              selectedRowKeys.findIndex((record) => record === data.id) > -1;
            return (
              <Card
                key={idx}
                shadows="hover"
                headerStyle={{ padding: '8px', height: '15%' }}
                header={
                  <div className="flex gap-2 items-center">
                    {tryGetIcon('IconGridStroked')}
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
                      bars={operatorBarList}
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
      )}

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
