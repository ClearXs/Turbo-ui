import { Tree, TreeGeneralApi } from '@/api';
import { TreePanelApi, TreePanelContext } from './interface';
import { VIRTUAL_ROOT_VALUE } from './contant';
import { loadTreeData } from './tree';
import { FormSelectColumnProps } from '../TForm/components';
import OperatorButtonSet from '../TableCrud/OperatorButtonSet';
import { Notification, Space } from '@douyinfe/semi-ui';
import ConstantTag from '../Tag/ConstantTag';
import { expand } from '@/util/tree';
import renderTreeOperatorBar from './TreeOperatorBar';
import { TFormContext } from '../TForm/context/form';

export default class TreePanelApiImpl<T extends Tree>
  implements TreePanelApi<T>
{
  constructor(
    private treePanelContext: TreePanelContext<T>,
    private api: TreeGeneralApi<T>,
  ) {}

  tree(): void {
    const props = this.treePanelContext.props;
    const { params } = props;
    this.api
      .tree({ entity: params })
      .then((res) => {
        const { data, code } = res;
        if (code === 200) {
          this.treePanelContext.dataSource = data;
          const { first = true, root } = props;
          let node = data;
          // 添加根结点显示名称，该结点为虚拟结点
          if (root) {
            const rootNode: Partial<T> = {};
            rootNode.name = root;
            rootNode.children = node;
            rootNode.id = VIRTUAL_ROOT_VALUE;
            node = [rootNode];
          }
          // 转换树型数据
          let treeData = loadTreeData(
            node,
            (tree) => {
              const bars = renderTreeOperatorBar(props, this, tree).filter(
                (bar) => {
                  // 如果是ROOT结点，过滤编辑和删除
                  if (
                    tree.id === VIRTUAL_ROOT_VALUE &&
                    (bar.code === 'edit' ||
                      bar.code === 'delete' ||
                      bar.code === 'details')
                  ) {
                    return false;
                  }

                  // 非ROOT节点，过滤新增
                  if (tree.id !== VIRTUAL_ROOT_VALUE && bar.code === 'add') {
                    return false;
                  }
                  return true;
                },
              );
              // 尝试读取columns中 类型为select的数据，使用其用作label渲染
              const { columns } = props;
              const constants = columns
                .filter((c) => c.type === 'select')
                .map((c) => {
                  const selectColumn = c as FormSelectColumnProps<T>;
                  const { dictionary, optionList, field } = selectColumn;
                  if (dictionary) {
                    const formContext = this.treePanelContext.formContext;
                    return formContext?.dataSet?.[dictionary]?.find(
                      (d) => d.value === tree[field],
                    );
                  } else if (optionList) {
                    return optionList.find((o) => o.value === tree[field]);
                  } else {
                    return undefined;
                  }
                })
                .filter((c) => c !== undefined);

              return (
                <div className="flex items-center">
                  {props.label?.(tree) || (
                    <Space>
                      {tree.name}
                      {constants.map((c) => {
                        return <ConstantTag constant={c} />;
                      })}
                    </Space>
                  )}
                  <TFormContext.Provider
                    value={this.treePanelContext.formContext}
                  >
                    <OperatorButtonSet<T>
                      bars={bars}
                      showButtonName={false}
                      record={tree}
                      mode="mixed"
                      className="ml-auto"
                      aggregate={2}
                    />
                  </TFormContext.Provider>
                </div>
              );
            },
            props.depth,
          );

          let firstKey;
          if (root && !first) {
            firstKey = node[0].id;
          } else if (first) {
            // root不存在并且选中第一个结点
            firstKey = data[0]?.id;
          }
          if (firstKey) {
            if (firstKey === VIRTUAL_ROOT_VALUE) {
              props.onSelectChange?.(undefined);
            } else {
              props.onSelectChange?.(firstKey);
            }
            this.treePanelContext.selectKey = firstKey;
          }
          this.treePanelContext.tree = treeData;
          // 设置全选数据
          this.treePanelContext.allKeys = expand(node, 'id');
        }
      })
      .finally(() => (this.treePanelContext.loading = false));
  }
  details(record: T): void {
    const formContext = this.treePanelContext.formContext;
    if (formContext) {
      formContext.visible = true;
      formContext.type = 'details';
      formContext.setValues(record);
    }
  }
  edit(record: T): void {
    const formContext = this.treePanelContext.formContext;
    if (formContext) {
      formContext.visible = true;
      formContext.type = 'edit';
      formContext.setValues(record);
    }
  }
  remove(ids: string[]): void {
    this.api.deleteEntity(ids).then((res) => {
      const { code, data, message } = res;
      if (code === 200 && data) {
        this.tree();
        Notification.success({ position: 'top', content: message });
      } else {
        Notification.error({ position: 'top', content: message });
      }
    });
  }
  getSelectKey(): string {
    return this.treePanelContext.selectKey;
  }
  getSelectKeys(): string[] {
    return this.treePanelContext.selectKeys;
  }
  selectAll(): void {
    this.treePanelContext.selectKeys = this.treePanelContext.allKeys;
  }
  unSelectAll(): void {
    this.treePanelContext.selectKeys = [];
  }
}
