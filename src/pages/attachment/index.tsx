import { useMemo } from 'react';
import TableCrud from '@/components/TableCrud';
import { TableColumnProps } from '@/components/TableCrud/TableCrud';
import { PROVIDER } from '@/constant/provider';
import useAttachmentApi, { Attachment } from '@/api/attachment';
import { directGetIcon } from '@/components/Icon';

export default function (): React.ReactNode {
  const columns: TableColumnProps<Attachment>[] = useMemo(() => {
    return [
      {
        title: '文件名称',
        dataIndex: 'filename',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        title: '文件地址',
        dataIndex: 'filepath',
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
    ];
  }, []);

  return (
    <TableCrud<Attachment>
      model="attachment"
      columns={columns}
      useApi={useAttachmentApi}
      page={true}
      operateBar={[
        {
          name: '预览',
          type: 'primary',
          icon: directGetIcon('IconEyeOpened'),
          onClick: (tableContext, record) => {
            window.open(record.filepath);
          },
        },
      ]}
    />
  );
}
