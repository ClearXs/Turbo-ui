import { directGetIcon } from '../Icon';
import { Button, Modal, Notification, Space, Tooltip } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { TableApi, TableContext, TableCrudProps, Toolbar } from './interface';
import { FormContext } from '../TForm/interface';
import { IdEntity } from '@/api/interface';

const renderableToolbar = <T extends IdEntity>(
  toolbarProps: TableCrudProps<T>['toolbar'] = {},
  formContext: FormContext<T>,
  tableApi: TableApi<T>,
) => {
  const toolbar: Toolbar<T>[] = [];
  const {
    showAdd = true,
    showBatchDelete = true,
    showExport = true,
    showImport = true,
    append = [],
  } = toolbarProps;
  // 如果没有设置参数默认为false
  showAdd &&
    toolbar.push({
      name: '新增',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconCopyAdd'),
      onClick: () => {
        const newFormContext = {
          ...formContext,
          visible: true,
          loading: false,
          type: 'add',
          values: formContext.getDefaultValues(),
        } as FormContext<T>;
        formContext?.newContext(newFormContext);
      },
    });
  showBatchDelete &&
    toolbar.push({
      name: '删除',
      position: 'left',
      type: 'danger',
      icon: directGetIcon('IconDelete'),
      onClick: (tableContext) => {
        if (_.isEmpty(tableContext?.table.selectedRowKeys)) {
          Notification.error({
            position: 'top',
            content: '未选择任何记录',
          });
        } else {
          Modal.warning({
            title: '是否确定删除',
            onOk: () => {
              tableApi.remove(
                tableContext,
                tableContext?.table.selectedRowKeys as string[],
              );
            },
          });
        }
      },
    });

  showImport &&
    toolbar.push({
      name: '导入',
      position: 'right',
      type: 'secondary',
      icon: directGetIcon('IconDescend2'),
    });

  showBatchDelete &&
    toolbar.push({
      name: '导出',
      position: 'right',
      type: 'secondary',
      icon: directGetIcon('IconDownloadStroked'),
    });
  // 添加追加的菜单栏按钮
  toolbar.push(...append);

  return toolbar;
};

type Props<T extends IdEntity> = {
  tableContext: TableContext<T>;
  formContext: FormContext<T>;
  tableApi: TableApi<T>;
};

function TableToolbar<T extends IdEntity>({
  tableContext,
  formContext,
  tableApi,
}: Props<T>) {
  const toolbar = renderableToolbar(
    tableContext?.props.toolbar,
    formContext,
    tableApi,
  );

  return (
    <div className="flex mt-3 mb-3 pl-2 pr-2">
      <div>
        <Space>
          {toolbar
            .filter((bar) => bar.position === 'left')
            .map((bar, index) => {
              return (
                <Button
                  key={index}
                  type={bar.type}
                  icon={bar.icon}
                  onClick={() =>
                    bar.onClick?.(tableContext as TableContext<T>, formContext)
                  }
                >
                  {bar.name}
                </Button>
              );
            })}
        </Space>
      </div>
      <div className="ml-auto">
        <Space>
          {toolbar
            .filter((bar) => bar.position === 'right')
            .map((bar, index) => {
              return (
                <Tooltip content={bar.name}>
                  <Button
                    key={index}
                    type={bar.type}
                    icon={bar.icon}
                    onClick={() =>
                      bar.onClick?.(
                        tableContext as TableContext<T>,
                        formContext,
                      )
                    }
                  />
                </Tooltip>
              );
            })}
        </Space>
      </div>
    </div>
  );
}

export default TableToolbar;
