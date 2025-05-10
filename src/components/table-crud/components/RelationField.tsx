import { Entity } from '@/api';
import { Button } from '@douyinfe/semi-ui';
import { TableColumnProps } from '../interface';
import { TableColumnDecorator } from '../table';
import UniForm from '@/components/uni-form/UniForm';

export type RelationComponentProps<T extends Entity> = {
  column: TableColumnProps<T>;
  record: T;
  decorator: TableColumnDecorator<T>;
  Display: React.ReactNode;
};

const Relational: React.FC<RelationComponentProps<any>> = ({
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
            const form = UniForm.open<any>({
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

export default Relational;
