import { useMemo } from 'react';
import BoHelper from './helper';
import { CategoryTree } from '@/api/system/category';
import useBoApi, { Bo } from '@/api/developer/bo';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import Binary from '@/components/Binary';
import { Modal, Notification } from '@douyinfe/semi-ui';
import ModularBoTable from './ModularBoTable';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import { directGetIcon } from '@/components/Icon';
import { TableContext } from '@/components/TableCrud/interface';
import { ModularProps } from '@/components/Modular/interface';
import { observer } from '@formily/reactive-react';
import { observable } from '@formily/reactive';
import Modular from '@/components/Modular/Modular';

type BoInternalProps = {
  showBoTable: boolean;
  tableContext?: TableContext<Bo>;
  bo?: Bo;
  boChangedFunc?: ModularProps['beforeCancel'];
};

const Bo: React.FC = observer(() => {
  const props: BoInternalProps = useMemo(() => {
    return observable({
      showBoTable: false,
      tableContext: undefined,
      bo: undefined,
    });
  }, []);

  const boApi = useBoApi();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'bo' }}
            addDefaultValue={{ funcCode: 'bo' }}
            useApi={CategoryHelper.getApi}
            onSelectChange={(categoryId) => {
              if (props.tableContext && categoryId) {
                props.tableContext.search['categoryId'] = categoryId;
              }
            }}
            depth={0}
            root="业务对象分类"
            expandAll
          />
        }
        RightComponent={
          <CategoryTableCrud<Bo>
            mode="page"
            columns={BoHelper.getColumns()}
            funcCode="bo"
            useApi={BoHelper.getApi}
            getTableContext={(tableContext) =>
              (props.tableContext = tableContext)
            }
            operateBar={{
              append: [
                {
                  code: 'materialize',
                  name: '物化',
                  type: 'primary',
                  icon: directGetIcon('IconBriefStroked'),
                  onClick(tableContext, formContext, value) {
                    Modular.warning({
                      title: `'${value.name}'业务对象物化`,
                      content:
                        '该操作将会把业务对象的数据进行物理存储，请确认是否执行该操作!',
                      onConfirm: () => {
                        tableContext.table.loading = true;
                        return boApi
                          .materialize(value.id)
                          .then((res) => {
                            const { code, data } = res;
                            if (code === 200 && data) {
                              Notification.success({ content: '物化成功' });
                              tableContext.tableApi.listOrPageOrTree(
                                tableContext,
                              );
                            }
                            tableContext.table.loading = false;
                          })
                          .catch((err) => {
                            tableContext.table.loading = false;
                          });
                      },
                    });
                  },
                },
                {
                  code: 'details',
                  name: '明细',
                  type: 'primary',
                  icon: directGetIcon('IconDetails', 'system'),
                  onClick(tableContext, formContext, value) {
                    props.bo = value;
                    props.showBoTable = true;
                  },
                },
              ],
            }}
          />
        }
      />
      {props.bo && (
        <ModularBoTable
          boId={props.bo.id}
          visible={props.showBoTable}
          onCancel={() => (props.showBoTable = false)}
        />
      )}
    </>
  );
});

export default Bo;
