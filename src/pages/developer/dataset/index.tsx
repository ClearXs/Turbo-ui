import { useState } from 'react';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/tree/TreePanel';
import DatasetHelper from './helper';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/binary';
import _ from 'lodash';
import { Dataset } from '@/api/developer/dataset';
import { observer } from 'mobx-react';

const DatasetPage = () => {
  const [categoryId, setCategoryId] = useState<string>();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'dataset' }}
            addDefaultValue={{ funcCode: 'dataset' }}
            useApi={CategoryHelper.getApi}
            onSelectChange={setCategoryId}
            depth={0}
            root="数据集分类"
            expandAll
          />
        }
        RightComponent={
          <CategoryTableCrud<Dataset>
            mode="page"
            columns={DatasetHelper.getColumns()}
            useApi={DatasetHelper.getApi}
            params={{ categoryId: categoryId }}
            funcCode="dataset"
            operateBar={{
              append: [],
            }}
          />
        }
      />
    </>
  );
};

export default observer(DatasetPage);
