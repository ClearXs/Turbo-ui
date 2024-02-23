import { Button, Col, Collapsible, Form, Row, Space } from '@douyinfe/semi-ui';
import { directGetIcon } from '../Icon/shared';
import { useContext, useMemo, useRef } from 'react';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { TableContext, TableCrudProps } from './interface';
import { IdEntity } from '@/api/interface';
import { chunk } from '../TForm/util';
import { TableCrudContext } from './context';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

export type TableHeaderProps<T extends IdEntity> = {
  tableProps: TableCrudProps<T>;
};

const TableHeader = observer(
  <T extends IdEntity>(props: TableHeaderProps<T>) => {
    const formApiRef = useRef<FormApi | undefined>(undefined);

    const header = useMemo(() => {
      return observable({ showCollapseColumn: false });
    }, []);

    const tableContext = useContext<TableContext<T>>(TableCrudContext);

    const { columns = [], params } = props.tableProps;
    // 不调用tableContext.getTableColumns，避免都更改内部columns导致搜索项更改，从而杜绝页面大规模的动画
    const searchColumns = columns
      .filter((col) => {
        return typeof col.search === 'function'
          ? col.search(tableContext as TableContext<T>)
          : col.search;
      })
      .map((col) => {
        return {
          ...col,
          span: tableContext.decorator.getDefaultSpan(col) || 6,
        };
      });

    const chunks = chunk(searchColumns, 6);
    const directColumns = chunks[0] || { columns: [] };
    const collapseColumns = chunks.slice(1);

    return (
      <Form
        labelPosition="left"
        className="flex"
        getFormApi={(formApi) => (formApiRef.current = formApi)}
        initValues={tableContext?.search}
      >
        <div className="w-[80%]">
          <Row>
            {directColumns.columns.map((column, index) => {
              return (
                <Col
                  key={index}
                  span={tableContext?.decorator.getDefaultSpan(column)}
                  style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}
                >
                  {tableContext?.decorator.render(column, 'search')}
                </Col>
              );
            })}
          </Row>
          <Collapsible isOpen={header.showCollapseColumn}>
            {collapseColumns.map((barrier, collapseIndex) => {
              return (
                <Row key={collapseIndex}>
                  {barrier.columns.map((column, index) => {
                    return (
                      <Col
                        key={index}
                        span={tableContext.decorator.getDefaultSpan(column)}
                        style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}
                      >
                        {tableContext.decorator.render(column, 'search')}
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Collapsible>
        </div>
        <Space className="ml-auto mr-2">
          <Button
            type="tertiary"
            theme="borderless"
            icon={
              header.showCollapseColumn
                ? directGetIcon('IconChevronUp')
                : directGetIcon('IconChevronDown')
            }
            onClick={() =>
              (header.showCollapseColumn = !header.showCollapseColumn)
            }
          >
            更多
          </Button>
          <Button
            type="primary"
            icon={directGetIcon('IconSearch')}
            onClick={() => {
              // 相同key 默认值的优先级 > 表单值
              const values = Object.assign(
                formApiRef.current?.getValues(),
                params,
              );
              tableContext.search = values;
            }}
          >
            搜索
          </Button>
          <Button
            type="tertiary"
            icon={directGetIcon('IconRefresh')}
            onClick={() => {
              formApiRef.current?.reset();
              tableContext.search = params || {};
            }}
          >
            重制
          </Button>
        </Space>
      </Form>
    );
  },
);
export default TableHeader;
