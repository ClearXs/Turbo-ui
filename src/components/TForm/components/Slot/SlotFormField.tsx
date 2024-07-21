import { IdEntity } from '@/api';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField, JsonValueHandler, ValueHandler } from '..';
import { FormSlotColumnProps } from './interface';

/**
 *  @see formily/schema/SlotSchema.tsx
 */
export class SlotFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormSlotColumnProps<T>
> {
  doRender(
    column: FormSlotColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'slot';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }

  public getValueHandler(): ValueHandler {
    return new JsonValueHandler();
  }
}
