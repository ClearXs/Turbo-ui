import useOrgApi, { Org } from '@/api/system/org';
import { FormContext } from '@/components/TForm/interface';
import TableCrud from '@/components/TableCrud';
import OrgHelper from './helper';

const Org: React.FC = () => {
  return (
    <TableCrud<Org>
      model="tree"
      useApi={useOrgApi}
      columns={OrgHelper.getColumns()}
      operateBar={{
        append: [
          {
            name: '添加下级',
            type: 'primary',
            onClick: (tableContext, formContext, record) => {
              const newFormContext = {
                ...formContext,
                visible: true,
                values: Object.assign(
                  { parentId: record.id },
                  formContext?.getDefaultValues(),
                ),
              };
              formContext?.newContext(newFormContext as FormContext<Org>);
            },
          },
          {
            name: '添加同级',
            type: 'primary',
            onClick: (tableContext, formContext, record) => {
              const newFormContext = {
                ...formContext,
                visible: true,
                values: Object.assign(
                  { parentId: record.parentId },
                  formContext?.getDefaultValues(),
                ),
              };
              formContext?.newContext(newFormContext as FormContext<Org>);
            },
          },
        ],
      }}
    />
  );
};

export default Org;
