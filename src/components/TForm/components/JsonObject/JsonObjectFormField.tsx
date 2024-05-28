import { IdEntity } from '@/api';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField, FormJsonObjectColumnProps } from '..';

/**
 * @see JsonObjectSchema
 */
export class JsonObjectFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormJsonObjectColumnProps<T>
> {
  doRender(
    column: FormJsonObjectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'jsonObject';
  }
  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
