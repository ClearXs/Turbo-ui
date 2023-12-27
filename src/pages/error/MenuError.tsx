import ErrorSVG from '@/img/error.svg';
import { MenuErrorState } from '@/store/menu';
import { Button, Spin, Typography } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function MenuError(): React.ReactNode {
  const error = useRecoilValue(MenuErrorState);
  let waiting = error === undefined;

  return (
    <Spin spinning={waiting}>
      <div className="flex h-100vh w-100vw items-center justify-center">
        {error && (
          <>
            <img src={ErrorSVG} className="relative h-2/3 w-2/3" />
            <div
              className="absolute flex flex-col gap-2"
              style={{ left: '65%', top: '30%' }}
            >
              <Typography.Title heading={3}>{error.message}</Typography.Title>
              <Typography>
                我们正在努力创造更好的东西，
                <span className="font-bold">但不会太久的……</span>
              </Typography>
              <Link to="/home">
                <Button block>回到首页</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Spin>
  );
}
