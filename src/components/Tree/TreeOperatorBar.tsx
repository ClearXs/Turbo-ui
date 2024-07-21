import { Tree } from '@/api';
import { TreePanelApi, TreePanelProps } from '.';
import { OperateToolbar } from '../TableCrud/interface';
import {
  ADD_LITERAL_OPERATOR_BAR,
  DELETE_LITERAL_OPERATOR_BAR,
  DETAILS_LITERAL_OPERATOR_BAR,
  EDIT_LITERAL_OPERATOR_BAR,
} from '../Bar/collection';
import Modular from '../Modular/Modular';

export default function renderTreeOperatorBar<T extends Tree>(
  props: TreePanelProps<T>,
  treePanelApi: TreePanelApi<T>,
  record: T,
) {
  const bars: OperateToolbar<T>[] = [];
  const {
    showEdit = true,
    showDelete = true,
    showAdd = true,
    showDetails = true,
    append = [],
  } = props.operateBar || {};

  // 增加
  if ((typeof showAdd === 'function' && showAdd(record)) || showAdd) {
    const saveOperatorBar: OperateToolbar<T> = {
      ...ADD_LITERAL_OPERATOR_BAR,
      onClick(tableContext, formContext, value) {
        formContext.visible = true;
        formContext.loading = false;
        formContext.type = 'add';
        formContext.setValues(formContext.getDefaultValues());
      },
    };
    bars.push(saveOperatorBar);
  }

  // 编辑
  if ((typeof showEdit === 'function' && showEdit(record)) || showEdit) {
    const editOperatorBar: OperateToolbar<T> = {
      ...EDIT_LITERAL_OPERATOR_BAR,
      onClick: (tableContext, formContext, record) => {
        treePanelApi.edit(record);
      },
    };
    bars.push(editOperatorBar);
  }

  // 详情
  if (
    (typeof showDetails === 'function' && showDetails(record)) ||
    showDetails
  ) {
    const detailsOperatorBar: OperateToolbar<T> = {
      ...DETAILS_LITERAL_OPERATOR_BAR,
      onClick: (tableContext, formContext, record) => {
        treePanelApi.details(record);
      },
    };
    bars.push(detailsOperatorBar);
  }

  // 删除
  if ((typeof showDelete === 'function' && showDelete(record)) || showDelete) {
    const deleteOperatorBar: OperateToolbar<T> = {
      ...DELETE_LITERAL_OPERATOR_BAR,
      onClick(tableContext, formContext, value) {
        Modular.warning({
          title: '是否确定删除?',
          content: '该数据被删除，与其关联的数据将无法使用，请慎重操作!',
          onConfirm: () => {
            treePanelApi.remove([record.id]);
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
        bars.push({ ...maybeBar, internal: false });
      }
    } else {
      bars.push({ ...bar, internal: false });
    }
  });

  return bars;
}
