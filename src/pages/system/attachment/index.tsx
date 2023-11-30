import { useMemo } from 'react';
import TableCrud from '@/components/TableCrud';
import { PROVIDER } from '@/constant/provider';
import useAttachmentApi, { Attachment } from '@/api/system/attachment';
import { directGetIcon } from '@/components/Icon';
import { TableColumnProps } from '@/components/TableCrud/interface';

export default function (): React.ReactNode {
  const columns: TableColumnProps<Attachment>[] = useMemo(() => {
    return [
      {
        label: '文件名称',
        field: 'filename',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '文件地址',
        field: 'filepath',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '云存储供应商',
        field: 'provider',
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
      model="page"
      columns={columns}
      useApi={useAttachmentApi}
      toolbar={{ showAdd: false }}
      operateBar={{
        showEdit: false,
        append: [
          {
            name: '预览',
            type: 'primary',
            icon: directGetIcon('IconEyeOpened'),
            onClick: (tableContext, formContext, record) => {
              window.open(record.filepath);
            },
          },
        ],
      }}
    />
  );
}
