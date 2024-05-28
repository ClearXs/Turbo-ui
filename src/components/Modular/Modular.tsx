import { Button, ButtonGroup, Modal } from '@douyinfe/semi-ui';
import { ModularProps } from './interface';
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import cls from 'classnames';
import useBottomButton from '../Dialog/hook/useBottomButton';
import useIcon from '../Dialog/hook/useIcon';

// 封装Modal组件
const Modular = (props: ModularProps) => {
  const {
    title,
    content,
    closeOnEsc = true,
    visible = true,
    children,
    scrollX = true,
    scrollY = true,
    closable = true,
    size = 'medium',
    fullScreen,
    afterClose,
  } = props;

  const { modularButtons, powerfulCancel } = useBottomButton(props);
  const IconComponent = useIcon(props);

  const bodyClassName = cls(`${scrollY && 'max-h-[60vh] overflow-y-auto'}`);

  return (
    <Modal
      icon={IconComponent}
      closeOnEsc={closeOnEsc}
      title={title}
      visible={visible}
      size={size}
      fullScreen={fullScreen}
      onCancel={powerfulCancel}
      closable={closable}
      afterClose={afterClose}
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
      <div className={bodyClassName}>{content ?? children}</div>
    </Modal>
  );
};

export type StaticModularProps = Omit<ModularProps, 'type' | 'afterClose'>;

const show = (props: ModularProps) => {
  const div = document.createElement('div');
  const container = createRoot(div);
  document.body.appendChild(div);

  function open(props: StaticModularProps) {
    const newProps: ModularProps = { ...props, visible: true };
    render(newProps);
  }

  const destroy = () => {
    container.unmount();
  };

  function close() {
    const newProps: ModularProps = { ...props, visible: false };
    render(newProps);
  }

  function render(props: ModularProps) {
    const { onCancel, onConfirm } = props;

    container.render(
      <Suspense>
        <Modular
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

Modular.show = (props: StaticModularProps) => {
  return show(props);
};

Modular.success = (props: StaticModularProps) => {
  return show({ ...props, type: 'success' });
};

Modular.info = (props: StaticModularProps) => {
  return show({ ...props, type: 'info' });
};

Modular.warning = (props: StaticModularProps) => {
  return show({ ...props, type: 'warning' });
};

Modular.error = (props: StaticModularProps) => {
  return show({ ...props, type: 'error' });
};

export default Modular;
