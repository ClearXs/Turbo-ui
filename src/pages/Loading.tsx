import { useLottie } from 'lottie-react';
import LoadingAnimation from '@/lottie/Loading.json';
import Copyright from './Copyright';
import Declaration from './Declaration';

export default function Loading(): React.ReactNode {
  const LoadingView = useLottie({
    animationData: LoadingAnimation,
  });
  return (
    <div className="flex h-100vh w-100vw items-center justify-center">
      <div className="flex flex-col justify-items-center items-center">
        {LoadingView.View}
        <Declaration />
      </div>
      <Copyright />
    </div>
  );
}
