import {
  Button,
  Form,
  Spin,
  TabPane,
  Tabs,
  Typography,
} from '@douyinfe/semi-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as local from '@/util/local';
import * as headers from '@/util/constant';
import useAuthApi from '@/api/system/auth';
import { directGetIcon } from '@/components/icon';

const RegisterForm: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const [loading, setLoading] = useState<boolean>(false);
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
        <Spin spinning={loading}>
          <Tabs
            type="line"
            activeKey={registerTabKey}
            onTabClick={(k, _) => setRegisterKey(k)}
          >
            <TabPane tab="默认注册" itemKey="default">
              <Form
                labelWidth={100}
                onSubmit={async (data) => {
                  setLoading(true);
                  authApi
                    .register({
                      ...data,
                      source: 'SELF-BUILT',
                      tenantId,
                    })
                    .then((res) => {
                      if (res.code === 200) {
                        local.set(headers.Authentication, res.data?.tokenValue);
                        navigate('/');
                      }
                      setLoading(false);
                    })
                    .catch((err) => {
                      setLoading(false);
                    });
                }}
              >
                <Form.Input
                  field="username"
                  label="账号"
                  placeholder="请输入账号"
                  prefix={directGetIcon('IconUser')}
                  rules={[{ required: true, message: '请输入账号' }]}
                />
                <Form.Input
                  field="password"
                  type="password"
                  label="密码"
                  placeholder="请输入密码"
                  mode="password"
                  prefix={directGetIcon('IconLock')}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                />
                <Form.Input
                  label="手机号码"
                  field="phone"
                  placeholder="请输入手机号码"
                  rules={[{ required: true, message: '请输入手机号码' }]}
                  prefix={directGetIcon('IconPhoneStroke')}
                />
                <Form.Input
                  field="email"
                  type="email"
                  label="邮箱"
                  placeholder="请输入邮箱"
                  prefix={directGetIcon('IconMail')}
                />
                <Button className="mt-6" block size="large" htmlType="submit">
                  提交
                </Button>
              </Form>
            </TabPane>
            <TabPane tab="验证码注册" itemKey="captcha">
              <Form labelWidth={100}>
                <Form.Input
                  label="手机号码"
                  field="phone"
                  placeholder="请输入手机号码"
                  rules={[{ required: true, message: '请输入手机号码' }]}
                  prefix={directGetIcon('IconPhoneStroke')}
                />
                <div className="flex align-middle items-center">
                  <Form.Input
                    field="captcha"
                    label="验证码"
                    placeholder="请输入验证码"
                    prefix={directGetIcon('IconInbox')}
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码',
                      },
                    ]}
                  />
                  <Button className="ml-auto mt-auto  ">获取验证码</Button>
                </div>
                <Button className="mt-6" block size="large" htmlType="submit">
                  提交
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    </>
  );
};

export default RegisterForm;
