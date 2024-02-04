import { useRef, useState } from 'react';
import { CategoryTree } from '@/api/system/category';
import CategoryHelper from '@/pages/system/category/helper';
import TreePanel from '@/components/Tree/TreePanel';
import CategoryTableCrud from '@/pages/system/category/CategoryTableCrud';
import Binary from '@/components/Binary';
import _ from 'lodash';
import usePageApi, { Page } from '@/api/developer/page';
import PageHelper from './helper';
import { Notification, Toast } from '@douyinfe/semi-ui';
import FormEditor from '../editor/FormEditor';
import { directGetIcon } from '@/components/Icon';
import Modular from '@/components/Modular';
import MenuTreeComponent from '@/pages/system/menu/MenuTree';
import { TreePanelApi } from '@/components/Tree';
import { MenuTree } from '@/api/system/menu';

const Page: React.FC = () => {
  const pageApi = usePageApi();
  const [categoryId, setCategoryId] = useState<string>();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const formIdRef = useRef<string>();
  const pageRef = useRef<Page>();
  const [showMenuTree, setShowMenuTree] = useState<boolean>(false);
  const menuTreeApiRef = useRef<TreePanelApi<MenuTree>>();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<CategoryTree>
            columns={CategoryHelper.getColumns()}
            params={{ funcCode: 'page' }}
            addDefaultValue={{ funcCode: 'page' }}
            useApi={CategoryHelper.getApi}
            onSelectChange={setCategoryId}
            depth={0}
            root="页面分类"
            expandAll
          />
        }
        RightComponent={
          <CategoryTableCrud<Page>
            mode="cardPage"
            columns={PageHelper.getColumns()}
            useApi={PageHelper.getApi}
            params={{ categoryId: categoryId }}
            funcCode="page"
            operateBar={{
              append: [
                {
                  code: 'deploy',
                  name: '发布',
                  type: 'primary',
                  icon: directGetIcon('IconSendStroked'),
                  onClick(tableContext, formContext, value) {
                    pageRef.current = value;
                    setShowMenuTree(true);
                  },
                },
              ],
            }}
            card={{
              onClick(record) {
                if (_.isEmpty(record.boId)) {
                  Notification.error({ content: '请选择页面对象!' });
                  return;
                }
                setShowEditor(true);
                formIdRef.current = record.formId;
                pageRef.current = record;
              },
            }}
          />
        }
      />
      <FormEditor
        visible={showEditor}
        panels={['formDesign', 'dataView', 'pageSetting', 'dataManager']}
        onSave={(kernel) => {
          if (_.isEmpty(pageRef.current)) {
            Toast.error('未选中页面!');
            return;
          }
          const dataView = kernel.getDataView();
          pageRef.current.dataview = JSON.stringify(dataView, null, 2);
          pageApi.saveOrUpdate(pageRef.current);
        }}
        onCancel={() => setShowEditor(false)}
        formOrId={formIdRef.current}
      />
      <Modular
        title="发布菜单"
        visible={showMenuTree}
        onConfirm={() => {
          if (_.isEmpty(pageRef.current)) {
            Toast.error('未选择页面!');
            return;
          }
          const selectKey = menuTreeApiRef.current?.getSelectKey();
          if (_.isEmpty(selectKey)) {
            Toast.error('未选择菜单!');
            return;
          }
          pageApi
            .deploy(pageRef.current, selectKey)
            .then((res) => {
              const { code, data, message } = res;
              if (code === 200 && data) {
                Toast.success('发布成功');
                setShowMenuTree(false);
              } else {
                Toast.error(message);
              }
            })
            .catch((err) => Toast.error(err));
        }}
        onCancel={() => setShowMenuTree(false)}
      >
        <MenuTreeComponent
          menuIds={pageRef.current && [pageRef.current.route]}
          showAdd
          showAddPeer
          showAddSubordinate
          multiple={false}
          getTreeApi={(treeApi) => (menuTreeApiRef.current = treeApi)}
        />
      </Modular>
    </>
  );
};

export default Page;
