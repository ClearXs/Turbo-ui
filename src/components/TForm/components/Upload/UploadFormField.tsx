import { IdEntity } from '@/api/interface';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormUploadProps } from '.';

export class UploadFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormUploadProps<T>
> {
  doRender(
    column: FormUploadProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'upload';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}

export class UploadDragFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormUploadProps<T>
> {
  doRender(
    column: FormUploadProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'uploadDrag';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
