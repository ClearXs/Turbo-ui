import { tryGetIcon } from '@/components/icon/shared';
import { Button, ButtonGroup, Popover, Typography } from '@douyinfe/semi-ui';
import { EditorProps } from '../interface';
import { DesignableProps } from '../Editor';
import { observer } from 'mobx-react';
import { useKernel } from '../kernel';

export type ActionWidgetProps = {
  designableProps: DesignableProps;
  onSave?: EditorProps['onSave'];
  onPublish?: EditorProps['onPublish'];
  onClose?: EditorProps['onClose'];
};

export const ActionWidget: React.FC<ActionWidgetProps> = observer(
  ({ designableProps, onSave, onPublish, onClose }) => {
    const kernel = useKernel();

    return (
      <ButtonGroup>
        <Popover
          content={
            <div className="p-2 flex gap-1 flex-col">
              <Typography.Title heading={6}>保存</Typography.Title>
              <Typography.Paragraph>
                该操作只会保存表单数据，不会对Bo数据进行任何变动
              </Typography.Paragraph>
              <Typography.Title heading={6}>发布</Typography.Title>
              <Typography.Paragraph spacing="extended">
                在保存的中基础上，将会对Bo数据进行变动，包括Bo生成的实例数据表
              </Typography.Paragraph>
            </div>
          }
        >
          <Button
            type="primary"
            icon={tryGetIcon('IconHelpCircleStroked')}
            theme="borderless"
          />
        </Popover>
        <Button
          loading={designableProps.loading}
          onClick={() => onSave?.(kernel, designableProps)}
          icon={tryGetIcon('IconCopyAdd')}
        >
          保存
        </Button>
        <Button
          loading={designableProps.loading}
          type="primary"
          onClick={() => onPublish?.(kernel, designableProps)}
          icon={tryGetIcon('IconSend')}
        >
          发布
        </Button>
        <Button
          type="primary"
          icon={tryGetIcon('IconClose')}
          theme="borderless"
          onClick={() => onClose?.(designableProps)}
        />
      </ButtonGroup>
    );
  },
);
