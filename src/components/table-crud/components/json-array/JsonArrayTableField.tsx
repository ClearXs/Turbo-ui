import { IdEntity } from '@/api';
import { BaseTableField } from '..';
import { ColumnType } from '@/components/tform/interface';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { TableJsonArrayColumnProps } from '.';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconJson } from '@/components/icon/collection/IconJson';
import { JsonValueHandler, ValueHandler } from '@/components/tform/components';

export class JsonArrayTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableJsonArrayColumnProps<T>
> {
  doWrap(column: TableJsonArrayColumnProps<T>): ColumnProps<T> {
    const render = (value: any, record: T, index: number) => {
      return (
        <Tooltip content={value && JSON.stringify(value, null, '\t')}>
          <Button icon={<IconJson />} theme="borderless" />
        </Tooltip>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'jsonArray';
  }

  public getValueHandler(): ValueHandler {
    return new JsonValueHandler();
  }
}
