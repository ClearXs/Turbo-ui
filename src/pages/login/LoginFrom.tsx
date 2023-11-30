import {
  Button,
  Divider,
  Form,
  Space,
  Spin,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { IconGithubLogo, IconWeibo } from '@douyinfe/semi-icons';
import useAuthApi, { Captcha } from '@/api/system/auth';

const LoginForm: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<Captcha | undefined>();

  useEffect(() => {
    authApi.captcha().then((res) => setCaptcha(res.data as Captcha));
  }, []);

  const reloadCaptcha = () => {
    authApi.captcha().then((res) => {
      setCaptcha(res.data);
    });
  };

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
        <Spin spinning={loading}>
          <Form
            onSubmit={async (data) => {
              setLoading(true);
              authApi
                .login({
                  ...data,
                  captchaId: captcha?.captchaId,
                  tenant: tenantId,
                })
                .then((res) => {
                  if (res.code !== 200) {
                    reloadCaptcha();
                  } else {
                    // 设置local storage
                    const token = res.data?.tokenValue || '';
                    local.set(headers.Authentication, token as string);
                    // 跳转至首页
                    navigate('/');
                  }
                  setLoading(false);
                })
                .catch((err) => {
                  reloadCaptcha();
                  setLoading(false);
                });
            }}
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
              mode="password"
              rules={[{ required: true, message: '请输入密码' }]}
            />
            <div className="flex">
              <Form.Input
                field="captcha"
                label="验证码"
                placeholder="请输入验证码"
                maxLength={4}
                rules={[{ required: true, message: '请输入验证码' }]}
              ></Form.Input>
              <Tooltip content="刷新验证码">
                <img
                  src={captcha?.base64 || ''}
                  className="w-24 h-12 ml-auto max-w-24"
                  onClick={reloadCaptcha}
                />
              </Tooltip>
            </div>
            <div className="flex items-center align-middle">
              <Button
                style={{ marginLeft: 'auto' }}
                size="large"
                theme="borderless"
              >
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
        </Spin>
        <div className="gap-2 flex flex-col m-5 items-center">
          <Divider>
            <Text type="tertiary">第三方登录</Text>
          </Divider>
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

export default LoginForm;
