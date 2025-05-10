import { Tree } from '@/api';
import { TreePanelApi, TreePanelContext } from '.';
import { OperateToolbar } from '../table-crud/interface';
import {
  ADD_LITERAL_OPERATOR_BAR,
  ADD_PEER_LITERAL_OPERATOR_BAR,
  ADD_SUBORDINATE_LITERAL_OPERATOR_BAR,
  DELETE_LITERAL_OPERATOR_BAR,
  DETAILS_LITERAL_OPERATOR_BAR,
  EDIT_LITERAL_OPERATOR_BAR,
} from '../bar/collection';
import Modular from '../modular/Modular';

export default function renderTreeOperatorBar<T extends Tree>(
  treePanelContext: TreePanelContext<T>,
  treePanelApi: TreePanelApi<T>,
  record: T,
) {
  const bars: OperateToolbar<T>[] = [];
  const props = treePanelContext.props;
  const {
    showEdit = true,
    showDelete = true,
    showAdd = true,
    showDetails = true,
    showSubordinate = false,
    showPeer = false,
    append = [],
  } = props.operateBar || {};

  // 增加
  if (
    (typeof showAdd === 'function' && showAdd(record, treePanelContext)) ||
    showAdd === true
  ) {
    const saveOperatorBar: OperateToolbar<T> = {
      ...ADD_LITERAL_OPERATOR_BAR,
      onClick(record, tableContext, formContext) {
        if (formContext) {
          formContext.visible = true;
          formContext.loading = false;
          formContext.type = 'add';
          formContext.setValues(formContext.getDefaultValues());
        }
      },
    };
    bars.push(saveOperatorBar);
  }

  // 编辑
  if (
    (typeof showEdit === 'function' && showEdit(record, treePanelContext)) ||
    showEdit === true
  ) {
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
    (typeof showDetails === 'function' &&
      showDetails(record, treePanelContext)) ||
    showDetails === true
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
  if (
    (typeof showDelete === 'function' &&
      showDelete(record, treePanelContext)) ||
    showDelete === true
  ) {
    const deleteOperatorBar: OperateToolbar<T> = {
      ...DELETE_LITERAL_OPERATOR_BAR,
      onClick(tableContext, formContext, record) {
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

  // 添加同级
  if (
    (typeof showPeer === 'function' && showPeer(record, treePanelContext)) ||
    showPeer === true
  ) {
    const addPeerOperatorBar: OperateToolbar<T> = {
      ...ADD_PEER_LITERAL_OPERATOR_BAR,
      onClick(tableContext, formContext, record) {
        formContext.title = `${record['name']}-添加同级`;
        formContext.visible = true;
        formContext.setValues(
          Object.assign(
            { parentId: record.parentId },
            formContext.getDefaultValues(),
          ),
        );
      },
    };
    bars.push(addPeerOperatorBar);
  }

  // 添加下级
  if (
    (typeof showSubordinate === 'function' &&
      showSubordinate(record, treePanelContext)) ||
    showSubordinate === true
  ) {
    const addSubordinateOperatorBar: OperateToolbar<T> = {
      ...ADD_SUBORDINATE_LITERAL_OPERATOR_BAR,
      onClick(tableContext, formContext, record) {
        formContext.title = `${record['name']}-添加下级`;
        formContext.visible = true;
        formContext.setValues(
          Object.assign(
            { parentId: record.id },
            formContext.getDefaultValues(),
          ),
        );
      },
    };
    bars.push(addSubordinateOperatorBar);
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
