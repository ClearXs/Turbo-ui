import { Entity } from '@/api';
import { BaseTableField, TableRadioColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/uni-form/interface';
import { Form, Typography } from '@douyinfe/semi-ui';

// TODO: 未经过验证
export class RadioTableField<T extends Entity> extends BaseTableField<
  T,
  TableRadioColumnProps<T>
> {
  doWrap(column: TableRadioColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Radio
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        />
      ) : (
        <Typography.Text
          ellipsis={{
            showTooltip: column.ellipsis === undefined ? true : column.ellipsis,
          }}
          style={{ maxWidth: column.width }}
        >
          {text}
        </Typography.Text>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'radio';
  }
}
