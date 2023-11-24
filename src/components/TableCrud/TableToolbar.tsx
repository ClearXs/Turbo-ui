import { useEffect, useState } from 'react';
import { directGetIcon } from '../Icon';
import { Button, Modal, Notification, Space, Tooltip } from '@douyinfe/semi-ui';
import { TableContextState } from '@/hook/table';
import { useRecoilState } from 'recoil';
import _ from 'lodash';
import { TableContext, Toolbar } from './TableCrud';
import { TableApi } from './table';

const TableToolbar: React.FC<{
  toolbar?: Toolbar<any>[];
  tableApi: TableApi<any>;
}> = ({ toolbar = [], tableApi }) => {
  const [renderableToolbar, setRenderableToolbar] = useState<Toolbar<any>[]>(
    [],
  );
  const [tableContext, setTableContext] = useRecoilState(TableContextState);
  useEffect(() => {
    const defaultToolbar = [
      {
        name: '新增',
        position: 'left',
        type: 'primary',
        icon: directGetIcon('IconCopyAdd'),
        onClick: (tableContext) => {
          const newTableContext = {
            ...tableContext,
            form: {
              ...tableContext.form,
            },
          };
          newTableContext.form.visible = true;
          newTableContext.form.loading = false;
          newTableContext.form.type = 'add';
          newTableContext.form.values = {};
          setTableContext(newTableContext);
        },
      },
      {
        name: '删除',
        position: 'left',
        type: 'danger',
        icon: directGetIcon('IconDelete'),
        onClick: (tableContext) => {
          if (_.isEmpty(tableContext.table.selectedRowKeys)) {
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
                  tableContext.table.selectedRowKeys as string[],
                );
              },
            });
          }
        },
      },
      {
        name: '下载',
        position: 'right',
        icon: directGetIcon('IconDownload'),
      },
    ] as Toolbar<any>[];

    setRenderableToolbar([...defaultToolbar, ...toolbar]);
  }, []);

  return (
    <div className="flex mt-3 mb-3 pl-2 pr-2">
      <div>
        <Space>
          {renderableToolbar
            .filter((bar) => bar.position === 'left')
            .map((bar, index) => {
              return (
                <Button
                  key={index}
                  type={bar.type}
                  icon={bar.icon}
                  onClick={() =>
                    bar.onClick && bar.onClick(tableContext as TableContext)
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
          {renderableToolbar
            .filter((bar) => bar.position === 'right')
            .map((bar, index) => {
              return (
                <Tooltip content={bar.name}>
                  <Button
                    key={index}
                    type={bar.type}
                    icon={bar.icon}
                    onClick={() =>
                      bar.onClick && bar.onClick(tableContext as TableContext)
                    }
                  />
                </Tooltip>
              );
            })}
        </Space>
      </div>
    </div>
  );
};

export default TableToolbar;
