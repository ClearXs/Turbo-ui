import { GeneralApi, IdEntity } from '@/api';
import { FormContext } from '../interface';
import { FormProps, ModalButton } from '../interface';
import { Form as CoreForm } from '@formily/core';
import { tryGetIcon } from '@/components/Icon';
import _ from 'lodash';
import { Button, ButtonGroup, Notification } from '@douyinfe/semi-ui';

export type IFormilyModalButtonProps<T extends IdEntity = IdEntity> = {
  formProps: FormProps<T>;
  formContext: FormContext<T>;
  form: CoreForm<T>;
};

export default function FormilyModalButton<T extends IdEntity = IdEntity>({
  formProps,
  formContext,
  form,
}: IFormilyModalButtonProps<T>) {
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
    modalButtons.push({
      code: 'cancel',
      name: '取消',
      type: 'tertiary',
      size: 'default',
      icon: tryGetIcon('IconCrossCircleStroked'),
      onClick: (formContext) => {
        if (formProps.onCancel) {
          formProps.onCancel(formContext);
        } else {
          formContext.visible = false;
        }
      },
    });
  }

  if (
    ((typeof showConfirm === 'function' && showConfirm(formContext)) ||
      showConfirm) &&
    formContext.type !== 'details'
  ) {
    modalButtons.push({
      code: 'confirm',
      name: '确定',
      type: 'primary',
      loading: true,
      size: 'default',
      icon: tryGetIcon('IconCheckCircleStroked'),
      onClick: (formContext) => {
        // 构建需要校验的字段
        const { params, onOk, onError } = formProps;
        form
          .submit((data) => {
            // 相同key优先级 默认值 > 表单值
            // if default value key is undefined but form value is not, choose form value
            const values = _.assignWith(
              data,
              params,
              (objectValue, sourceValue, key, object, source) => {
                if (!_.isEmpty(objectValue)) {
                  return objectValue;
                }
                return sourceValue;
              },
            );
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
    });
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
}
