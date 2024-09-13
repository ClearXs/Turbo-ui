import { Entity } from '@/api';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { ReactNode } from 'react';
import { FormCodeEditorColumnProps } from './interface';

/**
 * @see formily/schema/CodeEditorSchema.tsx
 */
export class CodeEditorFormField<T extends Entity> extends BaseFormField<
  T,
  FormCodeEditorColumnProps<T>
> {
  protected doRender(
    column: FormCodeEditorColumnProps<T>,
    type: 'search' | 'form',
  ): ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'codeEditor';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 24;
  }
}
