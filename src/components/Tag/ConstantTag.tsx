import { Constant, TreeConstant } from '@/constant';
import { Tag, Tooltip, Typography } from '@douyinfe/semi-ui';
import { tryGetIcon } from '../icon/shared';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';
import _ from 'lodash';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

export type ConstantTagProps = TagProps & {
  constant: Constant;
};

const ConstantTag = (props: ConstantTagProps) => {
  const { tag, icon, label, extra } = props.constant;
  return tag ? (
    <Tag
      size="large"
      {..._.omit(props, 'constant')}
      color={tag}
      prefixIcon={icon}
      suffixIcon={
        extra && (
          <Tooltip content={extra}>
            {tryGetIcon('IconHelpCircleStroked')}
          </Tooltip>
        )
      }
    >
      {label}
    </Tag>
  ) : (
    <Typography.Text ellipsis={{ showTooltip: true }}>{label}</Typography.Text>
  );
};

export const toTreeNode = (treeConstant?: TreeConstant[]): TreeNodeData[] => {
  return (
    treeConstant?.map((constant, i) => {
      return {
        key: constant.value,
        label: <ConstantTag constant={constant} key={i + constant.depth} />,
        value: constant.value,
        disabled: constant.depth === 0,
        children: toTreeNode(constant.children),
      };
    }) || []
  );
};

export default ConstantTag;
