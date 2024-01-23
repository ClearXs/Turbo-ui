import { IdEntity } from '@/api/interface';
import { Avatar, Form, Modal } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps, FormContext } from '../../interface';
import { BaseFormField } from '..';
import { FormIconColumnProps } from '.';
import { IconCamera } from '@douyinfe/semi-icons';
import { directGetIcon } from '@/components/Icon';
import IconList from '@/pages/developer/icon';

export class IconFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormIconColumnProps<T>
> {
  doRender(
    column: FormIconColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const isDetails = this.decorator.getFormContext()?.type === 'details';
    return (
      <>
        <Form.Slot label={props.label}>
          <Avatar
            alt="Alice Swift"
            size="small"
            shape="square"
            onClick={() => {
              if (isDetails) {
                return;
              }
              const modal = Modal.info({
                size: 'medium',
                title: 'Icon Resources',
                content: (
                  <IconList
                    chooseIcon={(icon) => {
                      const formContext = this.decorator.getFormContext();
                      const values = { ...formContext?.values } || {};
                      values[props.field] = icon;
                      const newContext = {
                        ...formContext,
                        visible: true,
                        values,
                      };
                      formContext?.newContext(newContext as FormContext<T>);
                      formContext?.formApi?.setValue(props.field, icon);
                      modal.destroy();
                    }}
                    showName={false}
                    splitNum={3}
                  />
                ),
                footer: null,
              });
            }}
            hoverMask={
              !isDetails && (
                <div
                  style={{
                    backgroundColor: 'var(--semi-color-overlay-bg)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCamera />
                </div>
              )
            }
          >
            {directGetIcon(
              this.decorator.getFormContext()?.values?.[props.field],
            )}
          </Avatar>
        </Form.Slot>
      </>
    );
  }

  public getType(): ColumnType {
    return 'icon';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
