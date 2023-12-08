import { TabPane, Tabs } from '@douyinfe/semi-ui';
import { useState } from 'react';
import UserProfile from './UserProfile';
import MyRole from './MyRole';
import MyPost from './MyPost';

const Profile = () => {
  const [profileKey, setProfileKey] = useState('profile');

  return (
    <>
      <Tabs
        className="h-[100%]"
        activeKey={profileKey}
        tabPosition="left"
        type="line"
        onTabClick={(itemKey) => {
          setProfileKey(itemKey);
        }}
      >
        <TabPane itemKey="profile" tab="我的信息">
          <UserProfile />
        </TabPane>
        <TabPane itemKey="password" tab="安全"></TabPane>
        <TabPane itemKey="role" tab="我的角色">
          <MyRole />
        </TabPane>
        <TabPane itemKey="post" tab="我的岗位">
          <MyPost />
        </TabPane>
        <TabPane itemKey="org" tab="我的组织"></TabPane>
        <TabPane itemKey="message" tab="我的消息"></TabPane>
      </Tabs>
    </>
  );
};

export default Profile;
