import useDicApi, { Dic } from '@/api/system/dic';
import { FormColumnProps } from '@/components/tform/interface';
import TableCrud from '@/components/table-crud';
import { DIC_TYPE } from '@/constant/dicType';
import { Divider, Empty, Space, Tag } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { useMemo, useState } from 'react';
import { IllustrationConstruction } from '@douyinfe/semi-illustrations';
import TreePanel from '@/components/tree/TreePanel';
import useReaction from '@/components/tform/formily/reaction';
import { observer } from 'mobx-react';

const DictionaryPage = () => {
  const [dicId, setDicId] = useState<string>();

  const columns: FormColumnProps<Dic>[] = useMemo(() => {
    const reaction = useReaction();
    return [
      {
        label: '名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '类型',
        field: 'type',
        ellipsis: true,
        align: 'center',
        type: 'select',
        optionList: DIC_TYPE,
        require: true,
        initValue: 'SYSTEM',
      },
      {
        label: '排序',
        field: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'number',
        initValue: 0,
      },
      {
        label: '描述',
        field: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        line: true,
      },
      {
        label: '颜色',
        field: 'color',
        ellipsis: true,
        align: 'center',
        type: 'color',
        line: true,
      },
      {
        label: '',
        field: 'parentId',
        ellipsis: true,
        form: false,
        table: false,
        align: 'center',
        type: 'textarea',
      },
    ];
  }, [dicId]);

  return (
    <>
      <div className="flex h-[100%]">
        <div className="w-[25%] p-2 overflow-auto">
          <TreePanel
            columns={columns}
            useApi={useDicApi}
            onSelectChange={setDicId}
            depth={0}
            expandAll
            label={(tree) => {
              const type = DIC_TYPE.find((v) => v.value === tree.type);
              return (
                <Space>
                  <Text type="secondary">{tree.name}</Text>
                  {type?.tag && <Tag color={type?.tag}>{type?.label}</Tag>}
                  <Text type="quaternary">{tree.code}</Text>
                </Space>
              );
            }}
          />
        </div>
        <Divider layout="vertical" style={{ height: '100%' }} />
        <div className="w-[75%] p-2 overflow-auto">
          {dicId ? (
            <TableCrud<Dic>
              mode="page"
              columns={columns}
              useApi={useDicApi}
              params={{ parentId: dicId }}
            />
          ) : (
            <Empty
              className="h-[100%] justify-center"
              image={<IllustrationConstruction />}
              description={<Text type="quaternary">暂无数据</Text>}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default observer(DictionaryPage);
