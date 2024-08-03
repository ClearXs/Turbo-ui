import { IdEntity } from '@/api';
import { ListPanelApi, ListPanelProps } from './interface';
import { OperateToolbar } from '../TableCrud/interface';
import {
  DELETE_LITERAL_OPERATOR_BAR,
  EDIT_LITERAL_OPERATOR_BAR,
} from '../Bar/collection';
import Modular from '../Modular/Modular';

export default function renderListPanelOperatorBar<T extends IdEntity>(
  record: T,
  operateBar: ListPanelProps<T>['operateBar'],
  listApi: ListPanelApi<T>,
) {
  const bars: OperateToolbar<T>[] = [];
  const { showEdit = true, showDelete = true, append = [] } = operateBar || {};

  // 编辑
  if (
    (typeof showEdit === 'function' && showEdit(record)) ||
    showEdit === true
  ) {
    const editOperatorBar: OperateToolbar<T> = {
      ...EDIT_LITERAL_OPERATOR_BAR,
      onClick: (tableContext, formContext, record) => {
        listApi.edit(record);
      },
    };
    bars.push(editOperatorBar);
  }

  // 删除
  if (
    (typeof showDelete === 'function' && showDelete(record)) ||
    showDelete === true
  ) {
    const deleteOperatorBar: OperateToolbar<T> = {
      ...DELETE_LITERAL_OPERATOR_BAR,
      onClick(tableContext, formContext, value) {
        Modular.warning({
          title: '是否确定删除?',
          content: '该数据被删除，与其关联的数据将无法使用，请慎重操作!',
          onConfirm: () => {
            listApi.remove([record.id]);
          },
        });
      },
    };
    bars.push(deleteOperatorBar);
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
}
