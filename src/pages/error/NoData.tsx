import NoDataSVG from '@/img/nodata.svg';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

export default function NoData() {
  return (
    <div>
      <img src={NoDataSVG} />
      <Text>暂无数据</Text>
    </div>
  );
}
