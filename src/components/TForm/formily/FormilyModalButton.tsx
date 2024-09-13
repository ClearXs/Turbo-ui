import { GeneralApi, Entity } from '@/api';
import { FormProps, ModalButton } from '../interface';
import _ from 'lodash';
import { Button, ButtonGroup, Notification } from '@douyinfe/semi-ui';
import {
  CANCEL_MODAL_BUTTON,
  CONFIRM_MODAL_BUTTON,
} from '@/components/bar/collection';
import { FormilyFormContext } from './interface';
import { observer } from '@formily/reactive-react';

export type IFormilyModalButtonProps<T extends Entity = Entity> = {
  formProps: FormProps<T>;
  formContext: FormilyFormContext<T>;
};

const FormilyModalButton = observer(
  <T extends Entity>({
    formProps,
    formContext,
  }: IFormilyModalButtonProps<T>) => {
    const {
      showConfirm = true,
      showCancel = true,
      append = [],
    } = formProps.modal || {
      showConfirm: true,
      showCancel: true,
      append: [],
    };
    let api: GeneralApi<T>;
    const { event, useApi } = formProps;
    if (useApi) {
      if (typeof useApi === 'function') {
        api = useApi();
      } else {
        api = useApi;
      }
    }

    const modalButtons: ModalButton<T>[] = [];

    if (
      (typeof showCancel === 'function' && showCancel(formContext)) ||
      showCancel
    ) {
      const cancelModalButton: ModalButton<T> = {
        ...CANCEL_MODAL_BUTTON,
        onClick(formContext) {
          if (formProps.onCancel) {
            formProps.onCancel(formContext);
          } else {
            formContext.visible = false;
          }
        },
      };
      modalButtons.push(cancelModalButton);
    }

    if (
      ((typeof showConfirm === 'function' && showConfirm(formContext)) ||
        showConfirm) &&
      formContext.type !== 'details'
    ) {
      const confirmModalButton: ModalButton<T> = {
        ...CONFIRM_MODAL_BUTTON,
        onClick() {
          // 构建需要校验的字段
          const { params, onOk, onError } = formProps;
          formContext
            .coreForm!.submit((data) => {
              // 相同key优先级 默认值 > 表单值
              // if default value key is undefined but form value is not, choose form value
              const tempValues = _.assignWith(
                data,
                params,
                (objectValue, sourceValue, key, object, source) => {
                  if (!_.isEmpty(objectValue)) {
                    return objectValue;
                  }
                  return sourceValue;
                },
              );

              // handle out values
              const values: Partial<T> = {};
              for (const field in tempValues) {
                const v = tempValues[field];
                const column = formContext.getColumn(field);
                if (column) {
                  const outValue = formContext.decorator
                    .getField(column)
                    .getValueHandler()
                    .toOutValue(v);
                  values[field] = outValue;
                } else {
                  values[field] = v;
                }
              }

              if (api) {
                formContext.loading = true;
                api
                  .saveOrUpdate(values)
                  .then((res) => {
                    if (res.code === 200 && res.data) {
                      Notification.success({
                        position: 'top',
                        content: res.message,
                      });
                      try {
                        // 回调事件
                        onOk?.(formContext);
                        event?.onSaveOrUpdateSuccess?.(values);
                      } catch (err) {
                        // simple print
                        console.error(err);
                      }
                      formContext.visible = false;
                    } else {
                      onError?.(new Error(res.message), formContext);
                    }
                  })
                  .catch((err) => {
                    onError?.(err, formContext);
                  })
                  .finally(() => {
                    formContext.loading = false;
                  });
              } else {
                formProps.onOk?.(formContext);
              }
            })
            .catch((err) => {
              const { showValidateErrorNotification = false } = formProps;
              if (!showValidateErrorNotification) {
                return;
              }
              // 提示表单错误信息
              let formErrorMessage = '';
              if (err.name) {
                formErrorMessage = err.name;
              } else if (typeof err === 'object') {
                formErrorMessage = Object.keys(err)
                  .map((eKey) => {
                    return err[eKey];
                  })
                  .join(',');
              }
              if (!_.isEmpty(formErrorMessage)) {
                Notification.error({
                  content: formErrorMessage,
                  position: 'top',
                });
              }
            });
        },
      };
      modalButtons.push(confirmModalButton);
    }

    append.forEach((button) => {
      if (typeof button === 'function') {
        const maybeButton = button(formContext);
        if (maybeButton) {
          modalButtons.push({ ...maybeButton });
        }
      } else {
        modalButtons.push({ ...button });
      }
    });

    return (
      <ButtonGroup className="float-right">
        {modalButtons.map((button) => {
          const {
            code,
            icon,
            type,
            size,
            loading = false,
            onClick,
            name,
          } = button;
          return (
            <Button
              key={code}
              icon={icon}
              type={type}
              size={size}
              loading={loading && formContext.loading}
              onClick={() => onClick?.(formContext)}
            >
              {name}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  },
);

export default FormilyModalButton;
