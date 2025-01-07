import { useMemo } from 'react';

const useApi = (apiProxy: string) => {
  const apiImport = useMemo(() => {
    return import.meta.glob('../api/*');
  }, []);

  const ApiHooks = Object.keys(apiImport)
    .filter((apiName) => {
      return apiName.match(`${apiProxy}.*.ts`) !== null;
    })
    .map((appName) => {
      return apiImport[appName]();
    })
    .shift();

  return ApiHooks;
};

export default useApi;
