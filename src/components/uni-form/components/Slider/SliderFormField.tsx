import { Entity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormSliderColumnProps } from '.';

export class SliderFormField<T extends Entity> extends BaseFormField<
  T,
  FormSliderColumnProps<T>
> {
  doRender(
    column: FormSliderColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Slider {...props} />;
  }

  public getType(): ColumnType {
    return 'slider';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
