import { Entity } from '@/api';
import { BaseTableField } from '..';
import { TableUploadDragColumnProps, TableUploadColumnProps } from '.';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { Form } from '@douyinfe/semi-ui';

export class UploadTableField<T extends Entity> extends BaseTableField<
  T,
  TableUploadColumnProps<T>
> {
  doWrap(column: TableUploadColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Upload
          {...column}
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        />
      ) : (
        text
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'upload';
  }
}

export class UploadDragTableField<T extends Entity> extends BaseTableField<
  T,
  TableUploadDragColumnProps<T>
> {
  doWrap(column: TableUploadDragColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'uploadDrag';
  }
}
