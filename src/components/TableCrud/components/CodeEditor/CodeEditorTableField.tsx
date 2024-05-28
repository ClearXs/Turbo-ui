import { IdEntity } from '@/api';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { TableCodeEditorColumnProps } from './interface';
import { Button, Tooltip, Typography } from '@douyinfe/semi-ui';
import { IconJson } from '@/components/Icon/collection/IconJson';

export class CodeEditorTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableCodeEditorColumnProps<T>
> {
  protected doWrap(column: TableCodeEditorColumnProps<T>): ColumnProps<T> {
    const render = (value: any, record: T, index: number) => {
      return (
        <Tooltip
          content={
            <Typography.Paragraph ellipsis={{ rows: 3 }} type="tertiary">
              {value && JSON.stringify(value, null, '\t')}
            </Typography.Paragraph>
          }
        >
          <Button icon={<IconJson />} theme="borderless" />
        </Tooltip>
      );
    };
    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'codeEditor';
  }
}
