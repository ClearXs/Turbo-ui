import { useMemo } from 'react';
import TableCrud from '@/components/table-crud';
import { PROVIDER } from '@/constant/provider';
import { CS_TYPE } from '@/constant/storageType';
import { ENABLE } from '@/constant/enable';
import useStorageConfigApi, {
  StorageConfig,
} from '@/api/developer/storageConfig';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Notification } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';

const StorageConfigPage = () => {
  const api = useStorageConfigApi();

  const columns: TableColumnProps<StorageConfig>[] = useMemo(() => {
    return [
      {
        field: 'name',
        label: '存储配置名称',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        field: 'endpoint',
        label: '存储端点',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        field: 'provider',
        label: '存储供应商',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: PROVIDER,
        require: true,
      },
      {
        field: 'csType',
        label: '存储类型',
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
        field: 'accessKey',
        label: '访问Key',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        field: 'secretKey',
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
    <TableCrud<StorageConfig>
      mode="page"
      columns={columns}
      useApi={useStorageConfigApi}
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
};

export default observer(StorageConfigPage);
