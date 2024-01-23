import TableCrud from '@/components/TableCrud';
import { useRef, useState } from 'react';
import BoHelper from './helper';
import useCategoryApi, { CategoryTree } from '@/api/system/category';
import useBoApi, { Bo } from '@/api/developer/bo';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import Binary from '@/components/Binary';
import { Modal } from '@douyinfe/semi-ui';
import BoTableComponent from './BoTable';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';

const Bo: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>();

  const [showBoTable, setShowBoTable] = useState<boolean>(false);

  const currentBoRef = useRef<Bo>();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'bo' }}
            addDefaultValue={{ funcCode: 'bo' }}
            useApi={useCategoryApi}
            onSelectChange={setCategoryId}
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
            useApi={useBoApi}
            params={{ categoryId: categoryId }}
            operateBar={{
              append: [
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
