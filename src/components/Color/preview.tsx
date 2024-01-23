import { Radio, RadioGroup, Space, Tag } from '@douyinfe/semi-ui';
import { TagColor } from '@douyinfe/semi-ui/lib/es/tag';
const colorList = [
  'amber',
  'blue',
  'cyan',
  'green',
  'grey',
  'indigo',
  'light-blue',
  'light-green',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'violet',
  'yellow',
  'white',
] as TagColor[];

export type ColorProps = {
  disabled?: boolean;
  value?: TagColor;
  onChange: RadioGroup['onChange'];
};

const Color: React.FC<ColorProps> = ({ disabled, value, onChange }) => {
  return (
    <Space wrap>
      <RadioGroup
        type="pureCard"
        mode="advanced"
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {colorList.map((item) => (
          <Radio
            value={item}
            extra={
              <Tag
                color={item}
                key={item}
                shape="circle"
                type="solid"
                style={{ padding: '2px 10px' }}
              />
            }
          />
        ))}
      </RadioGroup>
    </Space>
  );
};

export default Color;
