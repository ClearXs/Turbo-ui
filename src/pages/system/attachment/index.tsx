import { useMemo } from 'react';
import TableCrud from '@/components/table-crud';
import { PROVIDER } from '@/constant/provider';
import useAttachmentApi, { Attachment } from '@/api/system/attachment';
import { tryGetIcon } from '@/components/icon/shared';
import { TableColumnProps } from '@/components/table-crud/interface';

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
      mode="page"
      columns={columns}
      useApi={useAttachmentApi}
      toolbar={{ showAdd: false }}
      operateBar={{
        showEdit: false,
        append: [
          {
            code: 'preview',
            name: '预览',
            type: 'primary',
            icon: tryGetIcon('IconEyeOpened'),
            onClick: (tableContext, formContext, record) => {
              window.open(record.filepath);
            },
          },
        ],
      }}
    />
  );
}
