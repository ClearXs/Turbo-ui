import { IdEntity } from '@/api';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormJsonArrayColumnProps } from '.';

export class JsonArrayFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormJsonArrayColumnProps<T>
> {
  doRender(
    column: FormJsonArrayColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'jsonArray';
  }
  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
