import { MenuErrorState } from '@/store/menu';
import { Button, Typography } from '@douyinfe/semi-ui';
import { useLottie } from 'lottie-react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoadingAnimation from '@/lottie/Loading.json';
import Error from '@/lottie/404Error.json';
import Copyright from './Copyright';
import Declaration from './Declaration';

const ErrorComponent: React.FC<{ error: Error }> = ({ error }) => {
  const ErrorView = useLottie({ animationData: Error });
  return (
    <>
      <div className="flex flex-col justify-items-center items-center">
        {ErrorView.View}
        <Declaration />
      </div>
      <div
        className="absolute flex flex-col gap-2"
        style={{ left: '65%', top: '30%' }}
      >
        <Typography.Title heading={4}>{error.message}</Typography.Title>
        <Typography>
          我们正在努力创造更好的东西，
          <span className="font-bold">但不会太久的……</span>
        </Typography>
        <Link to="/home">
          <Button block>回到首页</Button>
        </Link>
      </div>
    </>
  );
};

const LoadingComponent = () => {
  const LoadingView = useLottie({
    animationData: LoadingAnimation,
  });
  return (
    <div className="flex flex-col justify-items-center items-center">
      {LoadingView.View}
      <Declaration />
    </div>
  );
};

export default function Loading(): React.ReactNode {
  const error = useRecoilValue(MenuErrorState);
  const waiting = error === undefined;
  const ViewComponent = waiting ? (
    <LoadingComponent />
  ) : (
    <ErrorComponent error={error} />
  );
  return (
    <div className="flex h-100vh w-100vw items-center justify-center">
      {ViewComponent}
      <Copyright />
    </div>
  );
}
