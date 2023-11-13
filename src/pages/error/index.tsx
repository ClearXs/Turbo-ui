import ErrorSVG from '@/img/error.svg';
import { Button, Typography } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';

export default function Error(): React.ReactNode {
  return (
    <div>
      <div className="flex h-100vh w-100vw items-center justify-center">
        <img src={ErrorSVG} className="relative h-2/3 w-2/3" />
        <div
          className="absolute flex flex-col gap-2"
          style={{ left: '65%', top: '30%' }}
        >
          <Typography.Title heading={3}>页面未找到</Typography.Title>
          <Typography>
            我们正在努力创造更好的东西，
            <span className="font-bold">但不会太久的……</span>
          </Typography>
          <Link to="/">
            <Button block>回到首页</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
