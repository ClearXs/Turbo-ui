import { Entity } from '@/api';
import { ColumnType, FormColumnProps } from '../../interface';
import {
  BaseFormField,
  FormJsonObjectColumnProps,
  JsonValueHandler,
  ValueHandler,
} from '..';

/**
 * @see JsonObjectSchema
 */
export class JsonObjectFormField<T extends Entity> extends BaseFormField<
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
    return 12;
  }

  public getValueHandler(): ValueHandler {
    return new JsonValueHandler();
  }
}
