import { useMemo } from 'react';
import TableCrud from '@/components/TableCrud';
import { PROVIDER } from '@/constant/provider';
import { CS_TYPE } from '@/constant/cstype';
import { ENABLE } from '@/constant/enable';
import useCloudStorageConfigApi, {
  CloudStorageConfig,
} from '@/api/developer/cloudstorageconfig';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Notification } from '@douyinfe/semi-ui';

export default function (): React.ReactNode {
  const api = useCloudStorageConfigApi();

  const columns: TableColumnProps<CloudStorageConfig>[] = useMemo(() => {
    return [
      {
        field: 'name',
        label: '云存储配置名称',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        field: 'endpoint',
        label: '云存储端点',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        field: 'provider',
        label: '云存储供应商',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: PROVIDER,
        require: true,
      },
      {
        field: 'csType',
        label: '云存储类型',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: CS_TYPE,
        require: true,
      },
      {
        field: 'bucket',
        label: '存储空间',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        field: 'accessId',
        label: '访问ID',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        field: 'accessKey',
        label: '访问密钥',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        field: 'enable',
        label: '是否启用',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: ENABLE,
        require: true,
      },
    ];
  }, []);

  return (
    <TableCrud<CloudStorageConfig>
      mode="page"
      columns={columns}
      useApi={useCloudStorageConfigApi}
      operateBar={{
        append: [
          (record) => {
            if (record.enable === 'DISABLE') {
              return {
                code: 'enable',
                name: '启用',
                type: 'primary',
                onClick: (tableContext) => {
                  api.enable(record.id).then((res) => {
                    if (res.code === 200 && res.data) {
                      Notification.success({
                        position: 'top',
                        content: res.message,
                      });
                      tableContext?.refresh();
                    } else {
                      Notification.error({
                        position: 'top',
                        content: res.message,
                      });
                    }
                  });
                },
              };
            }
          },
          (record) => {
            if (record.enable === 'ENABLE') {
              return {
                code: 'disable',
                name: '禁用',
                type: 'danger',
                onClick: (tableContext) => {
                  api.disable(record.id).then((res) => {
                    if (res.code === 200 && res.data) {
                      Notification.success({
                        position: 'top',
                        content: res.message,
                      });
                      tableContext?.refresh();
                    }
                  });
                },
              };
            }
          },
        ],
      }}
    />
  );
}
