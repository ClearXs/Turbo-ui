import { CategoryEntity } from '@/api/interface';
import { directGetIcon } from '@/components/Icon/shared';
import TableCrud from '@/components/TableCrud';
import {
  TableContext,
  TableCrudProps,
  Toolbar,
} from '@/components/TableCrud/interface';
import TreePanel from '@/components/Tree/TreePanel';
import { Notification } from '@douyinfe/semi-ui';
import CategoryHelper from './helper';
import useCategoryApi, { CategoryTree } from '@/api/system/category';
import { useRef, useState } from 'react';
import Modular from '@/components/Modular';
import { TreePanelApi } from '@/components/Tree';
import _ from 'lodash';

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
  const api = props.useApi?.();
  const [showCategoryTree, setShowCategoryTree] = useState<boolean>(false);
  const categoryTreeRef = useRef<TreePanelApi<CategoryTree>>();
  const currentRowRef = useRef<T[]>();
  const tableContextRef = useRef<TableContext<T>>();
  const newProps = { ...props };
  const { toolbar = {}, funcCode } = newProps;

  const { showSetCategory = true, append = [] } = toolbar;

  showSetCategory &&
    append.push({
      code: 'setCategory',
      name: '设置分类',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconGridView'),
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
    } as Toolbar<T>);
  toolbar.append = append;
  newProps.toolbar = toolbar;
  return (
    <>
      <TableCrud<T>
        {...newProps}
        getTableContext={(tableContext) =>
          (tableContextRef.current = tableContext) &&
          newProps.getTableContext?.(tableContext)
        }
      />
      <Modular
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
          api
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
          useApi={useCategoryApi}
          params={{ funcCode }}
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
