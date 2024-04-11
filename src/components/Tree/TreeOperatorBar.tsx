import { Tree } from '@/api';
import { TreePanelApi, TreePanelProps } from '.';
import { OperateToolbar } from '../TableCrud/interface';
import { tryGetIcon } from '../Icon/shared';
import { Modal } from '@douyinfe/semi-ui';

export default function useTreeOperatorBar<T extends Tree>() {
  return (
    props: TreePanelProps<T>,
    treePanelApi: TreePanelApi<T>,
    record: T,
  ) => {
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
      bars.push({
        code: 'add',
        name: '增加',
        type: 'primary',
        size: 'small',
        icon: tryGetIcon('IconCopyAdd'),
        internal: true,
        onClick: (tableContext, formContext, record) => {
          formContext.visible = true;
          formContext.loading = false;
          formContext.type = 'add';
          formContext.values = formContext.getDefaultValues();
        },
      });
    }

    // 编辑
    if ((typeof showEdit === 'function' && showEdit(record)) || showEdit) {
      bars.push({
        code: 'edit',
        name: '编辑',
        type: 'primary',
        size: 'small',
        internal: true,
        icon: tryGetIcon('IconEditStroked'),
        onClick: (tableContext, formContext, record) => {
          treePanelApi.edit(formContext, record);
        },
      });
    }

    // 详情
    if (
      (typeof showDetails === 'function' && showDetails(record)) ||
      showDetails
    ) {
      bars.push({
        code: 'details',
        name: '详情',
        type: 'primary',
        size: 'small',
        icon: tryGetIcon('IconBriefStroked'),
        internal: true,
        onClick: (tableContext, formContext, record) => {
          formContext.visible = true;
          formContext.loading = false;
          formContext.values = record;
          formContext.type = 'details';
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
        internal: true,
        onClick: (tableContext, formContext, record) => {
          Modal.warning({
            title: '是否确定删除?',
            onOk: () => {
              treePanelApi.remove(formContext, [record.id]);
            },
          });
        },
      });
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
  };
}
