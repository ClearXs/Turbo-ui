import React, { useEffect, useState } from 'react';
import { Button, Select, Tooltip, Typography } from '@douyinfe/semi-ui';
import { IconArrowLeft } from '@douyinfe/semi-icons';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import LoginFrom from './LoginFrom';
import RegisterFrom from './RegisterFrom';
import useTenantApi, { Tenant } from '@/api/system/tenant';
import Copyright from '../Copyright';
import { useLottie } from 'lottie-react';
import LoadingAnimation from '@/lottie/Login.json';

const Login: React.FC = () => {
  const [switchRegister, setSwitchRegister] = useState<boolean>(false);
  const [tenantList, setTenantList] = useState<Tenant[]>([]);
  const [tenantId, setTenantId] = useState('');
  const tenantApi = useTenantApi();

  const { View } = useLottie({ animationData: LoadingAnimation });

  useEffect(() => {
    tenantApi.list({}).then((res) => {
      const data = res.data;
      setTenantList(data);
      // 初始化系统租户
      const defaultTenantId = data?.length > 0 && data[0].id;
      defaultTenantId && local.set(headers.Tenant, defaultTenantId);
      defaultTenantId && setTenantId(defaultTenantId);
    });
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-100vh w-100vw items-center bg-slate-100">
      <div className="mx-auto flex h-60vh w-60vw rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 shadow-xl">
        <div className="flex h-full w-2/5 flex-col">
          <div className="flex flex-1 flex-col items-center align-middle">
            <div className="my-5">
              <h1 className=" font-mono text-4xl text-gray-700">ClearX</h1>
            </div>
            <p className="font-mono text-base font-medium">
              一站式门店解决方案
            </p>
          </div>
          {View}
        </div>
        <div className="border border-dotted border-blue-gray-50"></div>
        <div className="relative flex w-3/5 flex-col items-center justify-center">
          <div className="absolute right-0 top-0">
            <Select
              insetLabel="门店"
              value={tenantId}
              onSelect={(v) => {
                setTenantId(v as string);
                local.set(headers.Tenant, tenantId);
              }}
            >
              {tenantList?.length > 0 &&
                tenantList?.map((tenant) => {
                  return (
                    <Select.Option key={tenant.id} value={tenant.id}>
                      {tenant.tenantName}
                    </Select.Option>
                  );
                })}
            </Select>
          </div>
          {!switchRegister && (
            <>
              <LoginFrom tenantId={tenantId} />
              <div className="flex justify-center absolute bottom-5">
                <Typography className="my-auto">没有账号？</Typography>
                <Button
                  onClick={() => setSwitchRegister(true)}
                  className="flex gap-1"
                >
                  立即注册
                </Button>
              </div>
            </>
          )}
          {switchRegister && (
            <>
              <RegisterFrom tenantId={tenantId} />
              <Tooltip content="返回">
                <button
                  className="absolute right-10 top-10 h-8 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => setSwitchRegister(false)}
                >
                  <IconArrowLeft className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 selection:h-6" />
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </div>

      <Copyright />
    </div>
  );
};
export default Login;
