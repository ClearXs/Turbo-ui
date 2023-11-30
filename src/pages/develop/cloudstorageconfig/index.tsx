import { useMemo } from 'react';
import TableCrud from '@/components/TableCrud';
import { PROVIDER } from '@/constant/provider';
import { CS_TYPE } from '@/constant/cstype';
import { ENABLE } from '@/constant/enable';
import useCloudStorageConfigApi, {
  CloudStorageConfig,
} from '@/api/develop/cloudstorageconfig';
import { TableColumnProps } from '@/components/TableCrud/interface';

export default function (): React.ReactNode {
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
        sorter: true,
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
      model="page"
      columns={columns}
      useApi={useCloudStorageConfigApi}
    />
  );
}
