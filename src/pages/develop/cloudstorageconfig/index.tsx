import { useMemo } from 'react';
import TableCrud from '@/components/TableCrud';
import { TableColumnProps } from '@/components/TableCrud/TableCrud';
import { PROVIDER } from '@/constant/provider';
import { CS_TYPE } from '@/constant/cstype';
import { ENABLE } from '@/constant/enable';
import useCloudStorageConfigApi, {
  CloudStorageConfig,
} from '@/api/develop/cloudstorageconfig';

export default function (): React.ReactNode {
  const columns: TableColumnProps<CloudStorageConfig>[] = useMemo(() => {
    return [
      {
        title: '云存储配置名称',
        dataIndex: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
        sorter: true,
      },
      {
        title: '云存储端点',
        dataIndex: 'endpoint',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '云存储供应商',
        dataIndex: 'provider',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: PROVIDER,
        require: true,
      },
      {
        title: '云存储类型',
        dataIndex: 'csType',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: CS_TYPE,
        require: true,
      },
      {
        title: '存储空间',
        dataIndex: 'bucket',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '访问ID',
        dataIndex: 'accessId',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '访问密钥',
        dataIndex: 'accessKey',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '是否启用',
        dataIndex: 'enable',
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
      model="cloudstorageconfig"
      columns={columns}
      useApi={useCloudStorageConfigApi}
      page={true}
    />
  );
}
