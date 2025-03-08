import { useEffect, useState } from 'react';

export type OperationSystem = 'windows' | 'macos' | 'linux' | 'android' | 'ios';

const useOperatingSystem = () => {
  const [os, setOs] = useState<OperationSystem>('windows');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    // 检测常见操作系统
    if (userAgent.indexOf('Win') !== -1) setOs('windows');
    else if (userAgent.indexOf('Mac') !== -1) setOs('macos');
    else if (userAgent.indexOf('Linux') !== -1) setOs('linux');
    else if (userAgent.indexOf('Android') !== -1) setOs('android');
    else if (
      userAgent.indexOf('iPhone') !== -1 ||
      userAgent.indexOf('iPad') !== -1
    )
      setOs('ios');
  }, []);

  return os;
};

export default useOperatingSystem;
