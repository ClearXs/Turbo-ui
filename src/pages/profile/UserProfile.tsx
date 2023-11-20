import { CurrentUserState } from '@/store/user';
import { Avatar, Button, Divider, Form, Space } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import _ from 'lodash';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function UserProfile() {
  const [isSave, setSave] = useState(false);
  const currentUser = useRecoilValue(CurrentUserState);

  return (
    <>
      <Form
        className="ml-5 flex flex-col gap-4 h-[100%]"
        onSubmit={(data) => {
          console.log(data);
        }}
        initValues={currentUser}
      >
        <div className="flex">
          <div>
            <Title heading={4}>个人信息</Title>
            <Text type="quaternary">更新你的头像与详细的信息</Text>
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
        <div>
          <div>
            <Title heading={4}>头像</Title>
            <Text type="quaternary">头像将在系统中展示</Text>
          </div>
          <div className="text-center w-[70%] ml-auto">
            <Form.Upload field="avatar" action="" noLabel disabled={!isSave}>
              <Avatar size="large" />
            </Form.Upload>
          </div>
        </div>
        <Divider />
        <div className="flex">
          <Title heading={4}>昵称</Title>
          <div className="text-center w-[70%] ml-auto">
            <Form.Input
              field="nickname"
              noLabel
              style={{ width: '50%' }}
              disabled={!isSave}
            />
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
              disabled={!isSave}
            />
          </div>
        </div>
      </Form>
    </>
  );
}
