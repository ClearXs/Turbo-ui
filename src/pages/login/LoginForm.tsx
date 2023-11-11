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
import useUserApi, { Captcha } from '@/api/user';
import useAuthApi from '@/api/auth';

const LoginForm: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const navigate = useNavigate();
  const userApi = useUserApi();
  const authApi = useAuthApi();
  const [loding, setLoding] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<Captcha | undefined>();

  useEffect(() => {
    userApi.captcha().then((res) => setCaptcha(res.data as Captcha));
  }, []);

  const getCaptcha = async () => {
    const result = await userApi.captcha().then((res) => res.data);
    setCaptcha(result as Captcha);
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
        <Spin spinning={loding}>
          <Form
            onSubmit={async (data) => {
              setLoding(true);
              const result = await authApi.login({
                ...data,
                captchaId: captcha?.captchaId,
                tenant: tenantId,
              });
              if (result.code !== 200) {
                await getCaptcha();
              } else {
                // 登陆成功
                // 1.设置local storage
                const token = result.data?.tokenValue || '';
                local.set(headers.Authentication, token as string);
                // 跳转至首页
                navigate('/');
              }
              setLoding(false);
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
              rules={[{ required: true, message: '请输入密码' }]}
            />
            <div className="flex">
              <Form.Input
                field="captcha"
                label="验证码"
                placeholder="请输入验证码"
                min={4}
                max={4}
                rules={[{ required: true, message: '请输入验证码' }]}
              ></Form.Input>
              <Tooltip content="刷新验证码">
                <img
                  src={captcha?.base64 || ''}
                  className="w-24 h-12 ml-auto max-w-24"
                  onClick={getCaptcha}
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
