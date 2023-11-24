import useDicApi, { Dic } from '@/api/system/dic';
import { directGetIcon } from '@/components/Icon';
import { loadTreeData } from '@/components/Tree';
import { DIC_TYPE } from '@/constant/dictype';
import {
  Button,
  ButtonGroup,
  Divider,
  Space,
  Tag,
  Tooltip,
  Tree,
} from '@douyinfe/semi-ui';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { useEffect, useState } from 'react';

const Dictionary: React.FC = () => {
  const dicApi = useDicApi();

  const [dicTree, setDicTree] = useState<TreeNodeData[]>([]);

  useEffect(() => {
    dicApi.list().then((res) => {
      if (res.code === 200) {
        const tree = loadTreeData(res.data, (node: Dic) => {
          const type = DIC_TYPE.find((v) => v.value === node.type);
          return (
            <>
              <div className="flex">
                <Space>
                  <Text type="secondary">{node.name}</Text>
                  <Tag color={type?.tag}>{type?.label}</Tag>
                  <Text type="quaternary">{node.code}</Text>
                </Space>
                <ButtonGroup className="ml-auto">
                  <Tooltip content="编辑">
                    <Button icon={directGetIcon('IconEdit')} />
                  </Tooltip>
                  <Tooltip content="删除">
                    <Button icon={directGetIcon('IconDelete')} />
                  </Tooltip>
                </ButtonGroup>
              </div>
            </>
          );
        });
        setDicTree(tree);
      }
    });
  }, []);

  return (
    <>
      <div className="flex h-[100%]">
        <div className="w-[25%] p-2 overflow-auto">
          <Button icon={directGetIcon('IconCopyAdd')}>新增</Button>
          <Tree
            treeData={dicTree}
            filterTreeNode
            showClear
            searchPlaceholder="输入字典项或者编码"
            icon={null}
          />
        </div>
        <Divider layout="vertical" style={{ height: '100%' }} />
        <div className="w-[70%] p-2 overflow-auto">right</div>
      </div>
    </>
  );
};

const DicList: React.FC = () => {};

export default Dictionary;
