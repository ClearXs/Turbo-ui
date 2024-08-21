import { GeneralApi, IdEntity } from '@/api';
import { ListPanelApi, ListPanelContext } from './interface';
import OperatorButtonSet from '../table-crud/OperatorButtonSet';
import { Notification } from '@douyinfe/semi-ui';
import renderListPanelOperatorBar from './ListOperatorBar';
import { TFormContext } from '../tform/context/form';

export default class ListPanelApiImpl<T extends IdEntity>
  implements ListPanelApi<T>
{
  constructor(
    private context: ListPanelContext<T>,
    private api: GeneralApi<T>,
  ) {}

  list(): void {
    this.context.loading = true;
    const props = this.context.props;
    this.api
      .list()
      .then((res) => {
        const { code, data } = res;
        if (code === 200) {
          const list = data.map((entity) => {
            const bars = renderListPanelOperatorBar<T>(
              entity,
              props.operateBar,
              this,
            );
            const treeNode = props.wrap?.(entity);
            return {
              ...treeNode,
              label: (
                <TFormContext.Provider value={this.context.formContext}>
                  <div className="flex">
                    {treeNode?.label}
                    <OperatorButtonSet
                      formContext={this.context.formContext}
                      bars={bars}
                      mode="direct"
                      record={entity}
                      className="ml-auto"
                      showButtonName={false}
                    />
                  </div>
                </TFormContext.Provider>
              ),
            };
          });
          // 是否选中第一条数据
          // 不是多选并且需要要选中第一条数据
          const { multiple, first = true } = this.context.props;
          if (!multiple && first && data.length > 0) {
            this.context.selectKey = data[0].id;
          }
          this.context.list = list;
          this.context.dataSource = data;
        } else {
          Notification.error({ position: 'top', content: res.message });
        }
      })
      .finally(() => (this.context.loading = false));
  }
  details(record: T): void {
    const formContext = this.context.formContext;
    if (formContext) {
      formContext.type = 'details';
      formContext.visible = true;
      formContext.setValues(record);
    }
  }
  edit(record: T): void {
    const formContext = this.context.formContext;
    if (formContext) {
      formContext.type = 'edit';
      formContext.visible = true;
      formContext.setValues(record);
    }
  }
  remove(ids: string[]): void {
    this.api.deleteEntity(ids).then((res) => {
      if (res.code === 200 && res.data) {
        this.list();
      } else {
        Notification.error({ position: 'top', content: res.message });
      }
    });
  }
  selectAll(): void {
    this.context.selectKeys = this.context.list.map(
      (entity) => entity.key as string,
    );
  }
  unSelectAll(): void {
    this.context.selectKeys = [];
  }
  getSelectKey(): string {
    return this.context.selectKey;
  }
  getSelectKeys(): string[] {
    return this.context.selectKeys;
  }
}
