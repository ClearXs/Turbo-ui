import { useRef, useState } from 'react';
import BoHelper from './helper';
import { CategoryTree } from '@/api/system/category';
import useBoApi, { Bo } from '@/api/developer/bo';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import Binary from '@/components/Binary';
import { Modal, Notification } from '@douyinfe/semi-ui';
import BoTableComponent from './BoTable';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import { directGetIcon } from '@/components/Icon';
import { TableContext } from '@/components/TableCrud/interface';

const Bo: React.FC = () => {
  const [showBoTable, setShowBoTable] = useState<boolean>(false);

  const currentBoRef = useRef<Bo>();
  const tableContextRef = useRef<TableContext<Bo>>();
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
              if (tableContextRef.current && categoryId) {
                tableContextRef.current.search['categoryId'] = categoryId;
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
              (tableContextRef.current = tableContext)
            }
            operateBar={{
              append: [
                {
                  code: 'materialize',
                  name: '物化',
                  type: 'primary',
                  icon: directGetIcon('IconBriefStroked'),
                  onClick(tableContext, formContext, value) {
                    Modal.warning({
                      title: `'${value.name}'业务对象物化`,
                      content:
                        '该操作将会把业务对象的数据进行物理存储，请确认是否执行该操作!',
                      onOk: () => {
                        tableContext.table.loading = true;
                        boApi
                          .materialize(value.id)
                          .then((res) => {
                            const { code, data } = res;
                            if (code === 200 && data) {
                              Notification.success({ content: '物化成功' });
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
                  onClick(tableContext, formContext, value) {
                    currentBoRef.current = value;
                    setShowBoTable(true);
                  },
                },
              ],
            }}
          />
        }
      />
      <Modal
        fullScreen
        footer={null}
        visible={showBoTable}
        closeOnEsc={false}
        onCancel={() => setShowBoTable(false)}
      >
        <BoTableComponent boId={currentBoRef.current?.id} />
      </Modal>
    </>
  );
};

export default Bo;
