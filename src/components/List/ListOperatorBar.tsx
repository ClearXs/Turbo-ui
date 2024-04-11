import { IdEntity } from '@/api';
import { RenderOperatorBarType } from './interface';
import { OperateToolbar } from '../TableCrud/interface';
import { tryGetIcon } from '../Icon/shared';
import { Modal } from '@douyinfe/semi-ui';

export default function useListOperatorBar<T extends IdEntity>() {
  const renderOperatorBars: RenderOperatorBarType<T> = (
    record,
    operateBar,
    listApi,
  ) => {
    const bars: OperateToolbar<T>[] = [];
    const {
      showEdit = true,
      showDelete = true,
      append = [],
    } = operateBar || {};

    // 编辑
    if ((typeof showEdit === 'function' && showEdit(record)) || showEdit) {
      bars.push({
        code: 'edit',
        name: '编辑',
        type: 'primary',
        size: 'small',
        icon: tryGetIcon('IconEditStroked'),
        onClick: (tableContext, formContext, record) => {
          listApi.edit(formContext, record);
        },
      });
    }

    // 删除
    if (
      (typeof showDelete === 'function' && showDelete(record)) ||
      showDelete
    ) {
      bars.push({
        code: 'delete',
        name: '删除',
        type: 'danger',
        size: 'small',
        icon: tryGetIcon('IconDeleteStroked'),
        onClick: (tableContext, formContext, record) => {
          Modal.warning({
            title: '是否确定删除?',
            onOk: () => {
              listApi.remove(formContext, [record.id]);
            },
          });
        },
      });
    }
    append.forEach((bar) => {
      if (typeof bar === 'function') {
        const maybeBar = bar(record);
        if (maybeBar) {
          bars.push(maybeBar);
        }
      } else {
        bars.push(bar);
      }
    });

    return bars;
  };
  return renderOperatorBars;
}
