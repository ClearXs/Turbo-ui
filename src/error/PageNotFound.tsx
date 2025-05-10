import useStore from '@/hook/useStore';
import { useEffect } from 'react';

const PageNotFound = () => {
  const { pathname } = window.location;
  const { error } = useStore();

  useEffect(() => {
    // 发布菜单错误
    error.setError({ status: 404, message: `page ${pathname} not found` });
  }, [pathname]);
  return <></>;
};

export default PageNotFound;
