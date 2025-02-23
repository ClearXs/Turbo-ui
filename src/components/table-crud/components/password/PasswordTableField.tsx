import { Entity } from '@/api';
import { BaseTableField } from '..';
import { TablePasswordColumnProps } from '.';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/uni-form/interface';
import { Form, Typography } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { directGetIcon } from '@/components/icon';

export class PasswordTableField<T extends Entity> extends BaseTableField<
  T,
  TablePasswordColumnProps<T>
> {
  doWrap(column: TablePasswordColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Input
          {...props}
          mode="password"
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        />
      ) : (
        <PasswordLabel label={text} column={column} />
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'password';
  }
}

const PasswordLabel: React.FC<{
  label: string;
  column: TablePasswordColumnProps<any>;
}> = observer(({ label, column }) => {
  const [password, setPassword] = useState<string>(
    ['*'.repeat(label.length)].join(),
  );

  const [whetherPlain, setWhetherPlain] = useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <Typography.Text
        ellipsis={{
          showTooltip: column.ellipsis === undefined ? true : column.ellipsis,
        }}
        style={{ maxWidth: column.width }}
      >
        {password}
      </Typography.Text>

      <div
        className="cursor-pointer"
        onClick={() => {
          if (!whetherPlain) {
            setPassword(label);
          } else {
            setPassword(['*'.repeat(label.length)].join());
          }
          setWhetherPlain(!whetherPlain);
        }}
      >
        {whetherPlain
          ? directGetIcon('IconEyeClosedSolid')
          : directGetIcon('IconEyeOpened')}
      </div>
    </div>
  );
});
