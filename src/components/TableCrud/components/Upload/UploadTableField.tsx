import { IdEntity } from '@/api/interface';
import { BaseTableField } from '..';
import { TableUploadDragColumnProps, TableUploadColumnProps } from '.';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class UploadTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableUploadColumnProps<T>
> {
  doWrap(column: TableUploadColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'upload';
  }
}

export class UploadDragTableField<T extends IdEntity> extends BaseTableField<
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
