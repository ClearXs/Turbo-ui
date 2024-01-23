import { Select } from '@douyinfe/semi-ui';
import { Group, SelectGroupProps } from './interface';
import _ from 'lodash';
import { GroupConstant } from '@/constant';

const SelectGroup = (props: SelectGroupProps) => {
  const { optionList } = props;
  const groupCollection = _.groupBy(optionList, (c) => c.group.value);
  const groups: Group<GroupConstant>[] = [];
  for (const groupKey in groupCollection) {
    const children = groupCollection[groupKey];
    const group = { ...children[0].group, children } as Group<GroupConstant>;
    groups.push(group);
  }

  return (
    <Select {..._.omit(props, 'optionList')}>
      {groups.map((g) => {
        return (
          <Select.OptGroup label={g.label}>
            {g.children.map((option) => {
              return (
                <Select.Option value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select.OptGroup>
        );
      })}
    </Select>
  );
};

export default SelectGroup;
