import { CurrentUserState } from '@/store/user';
import {
  Avatar,
  Button,
  Divider,
  Form,
  Notification,
  Space,
  Spin,
  Upload,
} from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import _ from 'lodash';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as local from '@/util/local';
import * as headers from '@/util/constant';
import * as auth from '@/util/auth';
import useAuthApi from '@/api/system/auth';
import { IconCamera } from '@douyinfe/semi-icons';

export default function UserProfile() {
  const [isSave, setSave] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserState);

  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [loading, setLoading] = useState(false);

  const authApi = useAuthApi();

  return (
    <>
      <Spin spinning={loading}>
        <Form
          className="ml-5 flex flex-col gap-4 h-[100%]"
          onSubmit={(data) => {
            const newCurrentUser = { ...data, avatar };
            setLoading(true);
            authApi.modify({ ...data, avatar }).then((res) => {
              if (res.code === 200) {
                // 设置local storage
                const data = res.data;
                const token = data.token?.tokenValue || '';
                auth.set(token);
                setCurrentUser(newCurrentUser);
                setSave(false);
                Notification.success({ position: 'top', content: '修改成功!' });
              }
              setLoading(false);
            });
          }}
          initValues={currentUser}
          disabled={!isSave}
        >
          <div className="flex">
            <div>
              <Title heading={4}>个人信息</Title>
              <Text type="quaternary">更新你个人的详细信息</Text>
            </div>
            <div className="ml-auto mr-5">
              {isSave ? (
                <>
                  <Space>
                    <Button theme="solid" type="primary" htmlType="submit">
                      保存
                    </Button>
                    <Button
                      theme="solid"
                      type="tertiary"
                      onClick={() => setSave(false)}
                    >
                      取消
                    </Button>
                  </Space>
                </>
              ) : (
                <Button
                  theme="solid"
                  type="primary"
                  htmlType="button"
                  onClick={(event) => {
                    setSave(true);
                    event.stopPropagation();
                  }}
                >
                  编辑
                </Button>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex">
            <Title heading={4}>用户名</Title>
            <div className="text-center w-[70%] ml-auto">
              <Form.Input
                field="username"
                noLabel
                style={{ width: '50%' }}
                disabled
              />
            </div>
          </div>
          <Divider />
          <div className="flex mr-[50%]">
            <div>
              <Title heading={4}>头像</Title>
              <Text type="quaternary">头像将在系统中展示</Text>
            </div>
            <div className="ml-auto">
              <Upload
                className="avatar-upload"
                action="/api/sys/attachment/upload"
                name="file"
                onSuccess={(res) => {
                  const filepath = res['data']['filepath'];
                  const downloadUrl = `/api/sys/attachment/download?path=${filepath}`;
                  setAvatar(downloadUrl);
                }}
                onError={(error, file, fileList, xhr) => {
                  Notification.error({
                    position: 'top',
                    content: xhr.statusText,
                  });
                }}
                accept="image/*"
                showUploadList={false}
                headers={{
                  'X-AUTHENTICATION': local.get(headers.Authentication),
                  'X-TENANT': local.get(headers.Tenant),
                }}
                disabled={!isSave}
              >
                <Avatar
                  size="extra-large"
                  src={avatar}
                  hoverMask={
                    isSave && (
                      <div
                        style={{
                          backgroundColor: 'var(--semi-color-overlay-bg)',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--semi-color-white)',
                        }}
                      >
                        <IconCamera />
                      </div>
                    )
                  }
                />
              </Upload>
            </div>
          </div>
          <Divider />
          <div className="flex">
            <Title heading={4}>昵称</Title>
            <div className="text-center w-[70%] ml-auto">
              <Form.Input field="nickname" noLabel style={{ width: '50%' }} />
            </div>
          </div>
          <Divider />
          <div className="flex">
            <div>
              <Title heading={4}>手机号码</Title>
              <Text type="quaternary">
                请填写正确的手机号,它将为你发送重要的信息
              </Text>
            </div>
            <div className="text-center w-[70%] ml-auto">
              <Form.Input
                field="phone"
                disabled={!isSave}
                noLabel
                style={{ width: '50%' }}
              />
            </div>
          </div>
          <Divider />
          <div className="flex">
            <div>
              <Title heading={4}>邮箱</Title>
              <Text type="quaternary">邮箱将会是你收到系统重要消息的方式</Text>
            </div>
            <div className="text-center w-[70%] ml-auto">
              <Form.Input
                type="email"
                field="email"
                noLabel
                style={{ width: '50%' }}
              />
            </div>
          </div>
        </Form>
      </Spin>
    </>
  );
}
