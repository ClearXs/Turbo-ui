import { Button, Col, Collapsible, Form, Row } from '@douyinfe/semi-ui';
import { tryGetIcon } from '../icon/shared';
import { useContext, useMemo, useRef } from 'react';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { TableContext, TableCrudProps } from './interface';
import { Entity } from '@/api';
import { chunk } from '../uni-form/util/util';
import { TableCrudContext } from './context/table';
import ButtonSpace from '../button-space/ButtonSpace';
import useTableCrudContext from './hook/table';

export type TableHeaderProps<T extends Entity> = {
  tableProps: TableCrudProps<T>;
};

const TableHeader = <T extends Entity>(props: TableHeaderProps<T>) => {
  const formApiRef = useRef<FormApi | undefined>(undefined);

  const header = useMemo(() => {
    return { showCollapseColumn: false };
  }, []);

  const tableContext = useTableCrudContext();
  const { columns = [], params, search = {} } = props.tableProps;
  const {
    show = true,
    disabled = false,
    showSearch = true,
    showReset = true,
  } = search || {};

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
        disabled,
      };
    });

  const headerButton = [];

  // search button
  showSearch &&
    headerButton.push(
      <Button
        key="search"
        type="primary"
        icon={tryGetIcon('IconSearch')}
        onClick={() => {
          // 相同key 默认值的优先级 > 表单值
          const values = Object.assign(formApiRef.current?.getValues(), params);
          tableContext.search = values;
          tableContext.inlineEditorApi.clear();
        }}
      >
        搜索
      </Button>,
    );

  // reset button
  showReset &&
    headerButton.push(
      <Button
        key="reset"
        type="tertiary"
        icon={tryGetIcon('IconRefresh')}
        onClick={() => {
          formApiRef.current?.reset();
          tableContext.search = params || {};
          tableContext.inlineEditorApi.clear();
        }}
      >
        重制
      </Button>,
    );

  const chunks = chunk(searchColumns, 12);

  // more search columns button
  chunks.length > 1 &&
    headerButton.push(
      <Button
        key="more"
        type="tertiary"
        theme="borderless"
        icon={
          header.showCollapseColumn
            ? tryGetIcon('IconChevronUp')
            : tryGetIcon('IconChevronDown')
        }
        onClick={() => (header.showCollapseColumn = !header.showCollapseColumn)}
      >
        更多
      </Button>,
    );

  const directColumns = chunks[0] || { columns: [] };
  const collapseColumns = chunks.slice(1);

  return (
    show && (
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
                        style={{
                          paddingLeft: '0.5em',
                          paddingRight: '0.5em',
                        }}
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
        <ButtonSpace>{headerButton.map((Button) => Button)}</ButtonSpace>
      </Form>
    )
  );
};

export default TableHeader;
