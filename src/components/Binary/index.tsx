import { Divider } from '@douyinfe/semi-ui';

export type BinaryProps = {
  LeftComponent: React.ReactNode;
  RightComponent: React.ReactNode;
  rate?: 0.2 | 0.4 | 0.6;
};

export default function Binary(props: BinaryProps) {
  const { LeftComponent, RightComponent, rate = 0.2 } = props;

  return (
    <div className="flex h-[100%]">
      <div className="p-2 overflow-auto" style={{ width: rate * 100 + '%' }}>
        {LeftComponent}
      </div>
      <Divider layout="vertical" style={{ height: '100%' }} />
      <div
        className=" p-2 overflow-auto"
        style={{ width: (1 - rate) * 100 + '%' }}
      >
        {RightComponent}
      </div>
    </div>
  );
}
