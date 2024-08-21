import { Button, ButtonGroup, SideSheet, Space, Spin } from '@douyinfe/semi-ui';
import { SliderSideProps } from './interface';
import useBottomButton from '../dialog/hook/useBottomButton';
import cls from 'classnames';
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';

const SliderSide = (props: SliderSideProps) => {
  const {
    title,
    content,
    loading = false,
    closeOnEsc = true,
    visible = true,
    children,
    scrollX = true,
    scrollY = true,
    closable = true,
    size = 'medium',
    afterClose,
  } = props;
  const { modularButtons, powerfulCancel } = useBottomButton(props);

  const bodyClassName = cls(`${scrollY && 'overflow-y-auto'}`);

  return (
    <SideSheet
      title={title}
      visible={visible}
      closeOnEsc={closeOnEsc}
      size={size}
      onCancel={() => {
        powerfulCancel();
        afterClose?.();
      }}
      closable={closable}
      footer={
        <ButtonGroup className="float-right">
          {modularButtons.map((button) => {
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
                loading={loading && props.loading}
                onClick={() => onClick?.()}
              >
                {name}
              </Button>
            );
          })}
        </ButtonGroup>
      }
    >
      <Spin spinning={loading}>
        <div className={bodyClassName}>{content ?? children}</div>
      </Spin>
    </SideSheet>
  );
};

export type StaticModularProps = Omit<SliderSideProps, 'type' | 'afterClose'>;

const show = (props: SliderSideProps) => {
  const div = document.createElement('div');
  const container = createRoot(div);
  document.body.appendChild(div);

  function open(props: StaticModularProps) {
    const newProps: SliderSideProps = { ...props, visible: true };
    render(newProps);
  }

  const destroy = () => {
    container.unmount();
  };

  function close() {
    const newProps: SliderSideProps = { ...props, visible: false };
    render(newProps);
  }

  function render(props: SliderSideProps) {
    const { onCancel, onConfirm } = props;

    container.render(
      <Suspense>
        <SliderSide
          {...props}
          onConfirm={() => {
            const res = onConfirm?.();
            if (res && res.then) {
              res.then(
                (...args) => {
                  destroy();
                },
                (err) => {
                  destroy();
                },
              );
            } else {
              destroy();
            }
          }}
          onCancel={() => {
            const res = onCancel?.();
            if (res && res.then) {
              res.then(
                (...args) => {
                  destroy();
                },
                (err) => {
                  destroy();
                },
              );
            } else {
              destroy();
            }
          }}
          afterClose={() => destroy()}
        />
      </Suspense>,
    );
  }
  open(props);
  return { open, destroy, close };
};

SliderSide.show = (props: StaticModularProps) => {
  return show(props);
};

SliderSide.success = (props: StaticModularProps) => {
  return show({ ...props, type: 'success' });
};

SliderSide.info = (props: StaticModularProps) => {
  return show({ ...props, type: 'info' });
};

SliderSide.warning = (props: StaticModularProps) => {
  return show({ ...props, type: 'warning' });
};

SliderSide.error = (props: StaticModularProps) => {
  return show({ ...props, type: 'error' });
};

export default SliderSide;
