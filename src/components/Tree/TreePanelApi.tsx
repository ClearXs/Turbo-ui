import { Tree, TreeGeneralApi } from '@/api';
import { TreePanelApi, TreePanelContext } from './interface';
import { VIRTUAL_ROOT_VALUE } from './contant';
import { Notification } from '@douyinfe/semi-ui';
import { expand } from '@/util/tree';

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
          const node = data;
          let firstKey;
          if (root && !first) {
            firstKey = VIRTUAL_ROOT_VALUE;
          } else if (first) {
            // root不存在并且选中第一个结点
            firstKey = data[0]?.id;
          }
          if (firstKey) {
            if (firstKey !== VIRTUAL_ROOT_VALUE) {
              props.onSelectChange?.(firstKey);
            }
            this.treePanelContext.selectKey = firstKey;
          }
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
