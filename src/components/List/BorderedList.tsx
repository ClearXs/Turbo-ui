import { List, Typography } from '@douyinfe/semi-ui';
import { BorderedListProps } from './interface';

const BorderedList = <T extends any>(props: BorderedListProps<T>) => {
  const { dataSource, label, footer } = props;
  return (
    <List<T>
      dataSource={dataSource}
      renderItem={(data) => {
        return (
          <List.Item
            style={{
              border: '1px dashed gray',
              padding: '8px 16px',
              marginBottom: '.5rem',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
            main={<Typography.Text>{label(data)}</Typography.Text>}
            extra={footer(data)}
          />
        );
      }}
    />
  );
};

export default BorderedList;
