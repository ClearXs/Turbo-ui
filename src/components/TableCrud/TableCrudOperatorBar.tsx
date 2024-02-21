import { IdEntity } from '@/api/interface';
import { useMemo } from 'react';
import {
  OperateToolbar,
  RenderOperatorBarType,
  TableApi,
  TableCrudProps,
} from './interface';
import { directGetIcon } from '../Icon/shared';
import Modular from '../Modular/Modular';

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
        bars.push({
          code: 'edit',
          name: '编辑',
          type: 'primary',
          size: 'small',
          internal: true,
          icon: directGetIcon('IconEditStroked'),
          onClick: (tableContext, formContext, record) => {
            tableContext?.tableApi.edit(tableContext, formContext, record.id);
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
          icon: directGetIcon('IconBriefStroked'),
          internal: true,
          onClick: (tableContext, formContext, record) => {
            tableContext?.tableApi.details(
              tableContext,
              formContext,
              record.id,
            );
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
          internal: true,
          icon: directGetIcon('IconDeleteStroked'),
          onClick: (tableContext, formContext, record) => {
            Modular.warning({
              title: '是否确定删除?',
              content: '该数据被删除，与其关联的数据将无法使用，请慎重操作!',
              onConfirm: () => {
                tableApi?.remove(tableContext, [record.id]);
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
  }, []);
  return renderOperatorBars;
}

export default useTableCrudOperatorBar;
