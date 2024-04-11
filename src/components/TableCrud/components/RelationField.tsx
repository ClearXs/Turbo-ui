import { IdEntity } from '@/api';
import { Button } from '@douyinfe/semi-ui';
import { TableColumnProps } from '../interface';
import { TableColumnDecorator } from '../table';
import TForm from '@/components/TForm/TForm';

export type RelationComponentProps<T extends IdEntity> = {
  column: TableColumnProps<T>;
  record: T;
  decorator: TableColumnDecorator<T>;
  Display: React.ReactNode;
};

export const RelationComponent: React.FC<RelationComponentProps<any>> = ({
  column,
  record,
  decorator,
  Display,
}) => {
  const { field, label, relation } = column;
  const value = record[field];
  if (relation && value) {
    return (
      <Button
        theme="borderless"
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          const api = decorator.getRelationApis().get(field);
          if (api) {
            const form = TForm.open<any>({
              mode: 'simply',
              columns: relation.helper.getColumns(),
              title: relation.title || label,
              type: 'details',
              onCancel() {
                form.destroy();
              },
            });
            api
              .details(value)
              .then((res) => {
                const { code, data } = res;
                if (code === 200) {
                  form.open(data);
                }
              })
              .catch((err) => form.destroy());
          }
        }}
      >
        {Display}
      </Button>
    );
  } else {
    return Display;
  }
};
