import { CategoryEntity } from '@/api';
import TableCrud from '@/components/table-crud';
import {
  TableContext,
  TableCrudProps,
  Toolbar,
} from '@/components/table-crud/interface';
import TreePanel from '@/components/tree/TreePanel';
import { Notification } from '@douyinfe/semi-ui';
import CategoryHelper from './helper';
import { CategoryTree } from '@/api/system/category';
import { useMemo, useRef, useState } from 'react';
import { TreePanelApi } from '@/components/tree';
import _ from 'lodash';
import Modular from '@/components/modular/Modular';
import { SET_CATEGORY_LITERAL_TOOLBAR } from '@/components/bar/collection';

export type CategoryTableCrudToolbar<T extends CategoryEntity> =
  TableCrudProps<T>['toolbar'] & {
    // 是否展示设置分类按钮
    showSetCategory?: boolean;
  };

export type CategoryTableCrudProps<T extends CategoryEntity> = Omit<
  TableCrudProps<T>,
  'toolbar'
> & {
  toolbar?: CategoryTableCrudToolbar<T>;
  // 功能编码
  funcCode: string;
};

const CategoryTableCrud = <T extends CategoryEntity>(
  props: CategoryTableCrudProps<T>,
) => {
  const { useApi, toolbar: { showSetCategory = true, append = [] } = {} } =
    props;
  const [showCategoryTree, setShowCategoryTree] = useState<boolean>(false);
  const categoryTreeRef = useRef<TreePanelApi<CategoryTree>>();
  const currentRowRef = useRef<T[]>();
  const tableContextRef = useRef<TableContext<T>>();

  if (showSetCategory) {
    const setCategoryToolbar: Toolbar<T> = {
      ...SET_CATEGORY_LITERAL_TOOLBAR,
      onClick: (tableContext, formContext) => {
        const {
          dataSource,
          table: { selectedRowKeys = [] },
        } = tableContext as TableContext<T>;
        if (_.isEmpty(tableContext?.table.selectedRowKeys)) {
          Notification.error({ content: '请选择记录!' });
          return;
        }
        currentRowRef.current = dataSource.filter((record) => {
          return selectedRowKeys.includes(record.id);
        });
        setShowCategoryTree(true);
      },
    };
    append.push(setCategoryToolbar);
  }

  const categoryApi = CategoryHelper.getApi();

  return (
    <>
      <TableCrud<T>
        {...props}
        getTableContext={(tableContext) =>
          (tableContextRef.current = tableContext) &&
          props.getTableContext?.(tableContext)
        }
      />
      <Modular
        title="设置分类"
        visible={showCategoryTree}
        onCancel={() => setShowCategoryTree(false)}
        onConfirm={() => {
          const treeApi = categoryTreeRef.current;
          const selectKey = treeApi?.getSelectKey() as string;
          if (_.isEmpty(selectKey)) {
            Notification.error({ content: '请选择一条记录!' });
            return;
          }
          const rows = [...(currentRowRef.current || [])];
          rows.forEach((row) => (row.categoryId = selectKey));
          useApi
            .batchSaveOrUpdate(rows)
            .then((res) => {
              const { code, data } = res;
              if (code === 200 && data) {
                Notification.success({
                  position: 'top',
                  content: res.message,
                });
                setShowCategoryTree(false);
                tableContextRef.current?.refresh();
              }
            })
            .catch((err) => {
              Notification.success({
                position: 'top',
                content: err,
              });
            });
        }}
      >
        <TreePanel<CategoryTree>
          columns={CategoryHelper.getColumns()}
          first={false}
          useApi={categoryApi}
          params={{ funcCode: props.funcCode }}
          toolbar={{ showAdd: false }}
          operateBar={{ showEdit: false, showDelete: false, showAdd: false }}
          expandAll
          getTreePanelApi={(treePanelApi) => {
            categoryTreeRef.current = treePanelApi;
          }}
        />
      </Modular>
    </>
  );
};

export default CategoryTableCrud;
