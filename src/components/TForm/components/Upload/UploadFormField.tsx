import { Entity } from '@/api';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormUploadProps } from '.';

// TODO: 未实现
export class UploadFormField<T extends Entity> extends BaseFormField<
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
    return 12;
  }
}

export class UploadDragFormField<T extends Entity> extends BaseFormField<
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
    return 12;
  }
}
