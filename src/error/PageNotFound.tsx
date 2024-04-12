import { ErrorState } from '@/store/error';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const PageNotFound = () => {
  const { pathname } = window.location;
  const setError = useSetRecoilState(ErrorState);
  useEffect(() => {
    // 发布菜单错误
    setError({ status: 404, message: `page ${pathname} not found` });
  }, [pathname]);
  return <></>;
};

export default PageNotFound;
