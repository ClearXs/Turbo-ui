import { IdEntity } from '@/api';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { TableCodeEditorColumnProps } from './interface';
import { Button, Empty, Popover, Tooltip, Typography } from '@douyinfe/semi-ui';
import { IconJson } from '@/components/icon/collection/IconJson';

export class CodeEditorTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableCodeEditorColumnProps<T>
> {
  protected doWrap(column: TableCodeEditorColumnProps<T>): ColumnProps<T> {
    const render = (value: any, record: T, index: number) => {
      return (
        <Popover
          content={
            value === undefined ? (
              <Empty>没有数据</Empty>
            ) : (
              <div className="p-2">
                {value.split('\n').map((codeLine, index) => {
                  return (
                    <Typography.Paragraph
                      key={index}
                      type="primary"
                      spacing="extended"
                      className="whitespace-pre-line"
                    >
                      {codeLine}
                    </Typography.Paragraph>
                  );
                })}
              </div>
            )
          }
        >
          <Button icon={<IconJson />} theme="borderless" />
        </Popover>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'codeEditor';
  }
}
