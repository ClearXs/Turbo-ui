import { IdEntity } from '@/api';
import { useMemo } from 'react';
import {
  OperateToolbar,
  RenderOperatorBarType,
  TableApi,
  TableCrudProps,
} from './interface';
import { tryGetIcon } from '../Icon/shared';
import Modular from '../Modular/Modular';

export const EDIT_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'edit',
  name: '编辑',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconEditStroked'),
};

export const DETAILS_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'details',
  name: '详情',
  type: 'primary',
  size: 'small',
  icon: tryGetIcon('IconBriefStroked'),
  internal: true,
};

export const DELETE_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'delete',
  name: '删除',
  type: 'danger',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconDeleteStroked'),
};

function useTableCrudOperatorBar<T extends IdEntity>() {
  const renderOperatorBars = useMemo<RenderOperatorBarType<T>>(() => {
    return (
      record: T,
      operateBar?: TableCrudProps<T>['operateBar'],
      tableApi?: TableApi<T>,
    ) => {
      const bars: OperateToolbar<T>[] = [];
      const {
        showEdit = true,
        showDetails = true,
        showDelete = true,
        append = [],
      } = operateBar || {};

      // 编辑
      if ((typeof showEdit === 'function' && showEdit(record)) || showEdit) {
        const editOperatorBar: OperateToolbar<T> = {
          ...EDIT_LITERAL_OPERATOR_BAR,
          onClick(tableContext, formContext, value) {
            tableContext?.tableApi.edit(tableContext, formContext, record.id);
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
            tableContext?.tableApi.details(
              tableContext,
              formContext,
              record.id,
            );
          },
        };
        bars.push(detailsOperatorBar);
      }
      // 删除
      if (
        (typeof showDelete === 'function' && showDelete(record)) ||
        showDelete
      ) {
        const deleteOperatorBar: OperateToolbar<T> = {
          ...DELETE_LITERAL_OPERATOR_BAR,
          onClick(tableContext, formContext, value) {
            Modular.warning({
              title: '是否确定删除?',
              content: '该数据被删除，与其关联的数据将无法使用，请慎重操作!',
              onConfirm: () => {
                tableApi?.remove(tableContext, [record.id]);
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
    };
  }, []);
  return renderOperatorBars;
}

export default useTableCrudOperatorBar;
