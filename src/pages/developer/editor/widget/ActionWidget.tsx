import { directGetIcon } from '@/components/Icon';
import { Button, ButtonGroup, Popover, Typography } from '@douyinfe/semi-ui';
import { Engine } from '@designable/core';
import { EditorProps } from '../interface';
import { transformToSchema } from '@designable/formily-transformer';
import useFormApi from '@/api/developer/form';
import { useInitializeSchema } from '../service/schema';
import { useEffect } from 'react';

export type ActionWidgetProps = {
  engine: Engine;
  form: EditorProps['form'];
  onClose?: EditorProps['onClose'];
};

export const ActionWidget: React.FC<ActionWidgetProps> = ({
  engine,
  form,
  onClose,
}) => {
  const formApi = useFormApi();
  const initializeSchema = useInitializeSchema();

  useEffect(() => {
    initializeSchema(form);
  }, [form]);

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
          icon={directGetIcon('IconHelpCircleStroked')}
          theme="borderless"
        />
      </Popover>
      <Button
        onClick={() => {
          const schema = JSON.stringify(
            transformToSchema(engine.getCurrentTree()),
            null,
            2,
          );
          const boSchema = JSON.stringify(engine.getBoSchema(), null, 2);
          form.schema = schema;
          form.boSchema = boSchema;
          formApi.saveOrUpdate(form);
        }}
      >
        保存
      </Button>
      <Button type="primary" onClick={() => props.onPublish?.()}>
        发布
      </Button>
      <Button
        type="primary"
        icon={directGetIcon('IconClose')}
        theme="borderless"
        onClick={() => onClose?.()}
      />
    </ButtonGroup>
  );
};
