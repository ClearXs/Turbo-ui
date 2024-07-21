import { IdEntity } from '@/api';
import { Avatar, Form, Modal } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps, FormContext } from '../../interface';
import { BaseFormField } from '..';
import { FormIconColumnProps } from '.';
import { IconCamera } from '@douyinfe/semi-icons';
import { tryGetIcon } from '@/components/Icon';
import IconList from '@/pages/developer/icon';
import Modular from '@/components/Modular/Modular';

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
              const modal = Modular.info({
                icon: undefined,
                size: 'medium',
                title: 'Icon Resources',
                content: (
                  <IconList
                    tooltip={true}
                    chooseIcon={(icon) => {
                      const formContext = this.decorator.getFormContext();
                      formContext.setValue(props.field, icon);
                      modal.destroy();
                    }}
                    splitNum={3}
                  />
                ),
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
            {tryGetIcon(this.decorator.getFormContext()?.getValue(props.field))}
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
