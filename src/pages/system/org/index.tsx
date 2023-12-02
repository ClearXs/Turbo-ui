import useOrgApi, { Org } from '@/api/system/org';
import { FormContext } from '@/components/TForm/interface';
import TableCrud from '@/components/TableCrud';
import OrgHelper from './helper';
import { directGetIcon } from '@/components/Icon';
import { TableContext } from '@/components/TableCrud/interface';

const Org: React.FC = () => {
  return (
    <TableCrud<Org>
      model="tree"
      useApi={useOrgApi}
      columns={OrgHelper.getColumns()}
      expandAllRows
      toolbar={{
        append: [
          {
            name: '展开所有',
            type: 'primary',
            position: 'right',
            icon: directGetIcon('IconExpand'),
            onClick: (tableContext) => {
              const props = tableContext?.props;
              const newTableContext = {
                ...tableContext,
                props: {
                  ...props,
                },
              };
              newTableContext.props.expandAllRows = true;
              tableContext?.newContext(newTableContext as TableContext<Org>);
            },
          },
          {
            name: '缩放所有',
            type: 'primary',
            position: 'right',
            icon: directGetIcon('IconShrink'),
            onClick: (tableContext) => {
              const props = tableContext?.props;
              const newTableContext = {
                ...tableContext,
                props: {
                  ...props,
                },
              };
              newTableContext.props.expandAllRows = false;
              tableContext?.newContext(newTableContext as TableContext<Org>);
            },
          },
        ],
      }}
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
