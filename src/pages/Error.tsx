import { useLottie } from 'lottie-react';
import Declaration from './Declaration';
import { Button, Typography } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import PageNotFoundAnimation from '../lottie/404Error.json';
import InternalServerErrorAnimation from '../lottie/500Error.json';
import { useCallback } from 'react';
import useStore from '@/hook/useStore';

export default function Error(): React.ReactNode {
  const { error } = useStore();

  const loadLottieAnimation = useCallback(() => {
    const status = error.getError()?.status;
    if (status === 404) {
      return PageNotFoundAnimation;
    } else if (status === 500) {
      return InternalServerErrorAnimation;
    } else {
      return undefined;
    }
  }, [error]);

  const ErrorView = useLottie({
    animationData: loadLottieAnimation(),
  });

  return (
    <div className="flex h-100vh w-100vw items-center justify-center">
      <div className="flex flex-col justify-items-center items-center">
        <div className="w-[50%] h-[50%]">{ErrorView.View}</div>
        <Declaration />
      </div>
      <div
        className="absolute flex flex-col gap-2"
        style={{ left: '65%', top: '30%', maxWidth: '50%' }}
      >
        <Typography.Title heading={4} type="danger">
          {error.getError()?.message}
        </Typography.Title>
        <Typography>
          我们正在努力创造更好的东西，
          <span className="font-bold">但不会太久的……</span>
        </Typography>
        <Link to="/">
          <Button
            block
            onClick={() => {
              error.setError(undefined);
            }}
          >
            回到首页
          </Button>
        </Link>
      </div>
      <Copyright />
    </div>
  );
}
