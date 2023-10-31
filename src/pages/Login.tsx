import LoginSVG from '@/img/login.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/api/user.interface';
import { set } from '@/util/local';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  captchaQuery,
  refreshCaptchaIdState,
  useRefreshCaptcha,
} from '@/store/user';
import {
  Button,
  Form,
  Select,
  Space,
  Spin,
  TabPane,
  Tabs,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import {
  IconArrowLeft,
  IconArrowRight,
  IconGithubLogo,
  IconWeibo,
} from '@douyinfe/semi-icons';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { tenantListQuery } from '@/store/tenant';

type LoginInfo = {
  username: string;
  password: string;
  tenant: string;
  code: string;
  remeberMe: boolean;
};

const TenantSelect: React.FC = () => {
  const tenantList = useRecoilValue(tenantListQuery({}));
  return (
    <>
      <Select
        insetLabel="门店"
        defaultValue={(tenantList?.length > 0 && tenantList[0].tenantId) || ''}
      >
        {tenantList?.length > 0 &&
          tenantList?.map((tenant) => {
            return (
              <Select.Option value={tenant.tenantId}>
                {tenant.tenantName}
              </Select.Option>
            );
          })}
      </Select>
    </>
  );
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loding, setLoding] = useState<boolean>(false);
  const captcha = useRecoilValue(captchaQuery(0));
  const refreshCaptcha = useRefreshCaptcha(0);

  return (
    <>
      <Typography.Title
        heading={5}
        color="blue-gray"
        className="absolute top-5"
      >
        登陆
      </Typography.Title>
      <div className="w-4/5">
        <Form
          onSubmit={(data) => console.log(data)}
          labelPosition="left"
          labelCol={{ span: 4, offset: 22 }}
        >
          <Form.Input
            field="username"
            label="账号"
            placeholder="请输入账号"
            rules={[{ required: true, message: '请输入账号' }]}
          />
          <Form.Input
            field="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
          <div className="flex">
            <Form.Input
              field="captcha"
              label="验证码"
              placeholder="请输入验证码"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            ></Form.Input>
            <Tooltip content="刷新验证码">
              <img
                src={captcha?.base64 || ''}
                className="w-36 ml-auto"
                onClick={refreshCaptcha}
              />
            </Tooltip>
          </div>
          <div className="flex items-center align-middle">
            <Form.Checkbox
              field="remeberMe"
              label="记住我"
              labelPosition="left"
            />
            <Button style={{ marginLeft: 'auto' }} size="large">
              忘记密码?
            </Button>
          </div>
          <Button
            className="mt-2 relative"
            block
            size="large"
            htmlType="submit"
          >
            登陆
          </Button>
        </Form>
        <div className="gap-2 flex flex-col m-5 items-center">
          <Text type="tertiary">第三方登录</Text>
          <Space align="center">
            <Tooltip content="github">
              <IconGithubLogo size="large" />
            </Tooltip>
            <Tooltip content="微博">
              <IconWeibo size="large" />
            </Tooltip>
          </Space>
        </div>
      </div>
    </>
  );
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [loding, setLoding] = useState<boolean>(false);
  const [registerTabKey, setRegisterKey] = useState<string>('default');

  return (
    <>
      <Typography.Title
        heading={5}
        color="blue-gray"
        className="absolute top-5"
      >
        注册
      </Typography.Title>
      <div className="w-4/5">
        <Tabs
          type="line"
          activeKey={registerTabKey}
          onTabClick={(k, _) => setRegisterKey(k)}
        >
          <TabPane tab="默认注册" itemKey="default">
            <Form onSubmit={(data) => console.log(data)} labelPosition="left">
              <Form.Input
                field="username"
                label="账号"
                placeholder="请输入账号"
                rules={[{ required: true, message: '请输入账号' }]}
              />
              <Form.Input
                field="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              />
              <Form.InputGroup
                label={{ text: <span>手机号码</span>, required: true }}
                labelPosition="left"
              >
                <Form.Select
                  field="phonePrefix"
                  initValue="+86"
                  rules={[{ required: true }]}
                  showClear
                >
                  <Form.Select.Option value="+86">中国+86</Form.Select.Option>
                </Form.Select>
                <Form.Input
                  field="phone"
                  placeholder="请输入手机号码"
                  rules={[{ required: true }]}
                />
              </Form.InputGroup>
              <Form.Input
                field="email"
                type="email"
                label="邮箱"
                placeholder="请输入邮箱"
              />
              <Button className="mt-6" block size="large" htmlType="submit">
                注册
              </Button>
            </Form>
          </TabPane>
          <TabPane tab="验证码注册" itemKey="captcha">
            <Form>
              <Form.InputGroup
                label={{ text: <span>手机号码</span>, required: true }}
                labelPosition="top"
              >
                <Form.Select
                  style={{ width: 150 }}
                  field="phonePrefix"
                  initValue="+86"
                  rules={[{ required: true }]}
                  showClear
                >
                  <Form.Select.Option value="+86">中国+86</Form.Select.Option>
                </Form.Select>
                <Form.Input
                  field="phone"
                  label="手机号码"
                  placeholder="请输入手机号码"
                  labelPosition="left"
                  rules={[{ required: true }]}
                />
              </Form.InputGroup>
              <div className="flex align-middle items-center">
                <Form.Input
                  field="captcha"
                  label="验证码"
                  placeholder="请输入验证码"
                  labelPosition="left"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                ></Form.Input>
                <Button className="ml-auto">获取验证码</Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

const Login: React.FC = () => {
  const [switchReigster, setSwitchRegister] = useState<boolean>(false);
  return (
    <React.Suspense>
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
            <img
              className="relative max-h-full max-w-full flex-1 object-cover object-center"
              src={LoginSVG}
            />
          </div>
          <div className="border border-dotted border-blue-gray-50"></div>
          <div className="relative flex w-3/5 flex-col items-center justify-center">
            <div className="absolute right-0 top-0">
              <TenantSelect />
            </div>
            {!switchReigster && (
              <>
                <LoginForm />
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
            {switchReigster && (
              <>
                <RegisterForm />
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
      </div>
    </React.Suspense>
  );
};

export default Login;
