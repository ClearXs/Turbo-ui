import { TabPane, Tabs } from '@douyinfe/semi-ui';
import { useState } from 'react';
import UserProfile from './UserProfile';

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
        <TabPane itemKey="role" tab="角色"></TabPane>
        <TabPane itemKey="post" tab="岗位"></TabPane>
        <TabPane itemKey="org" tab="组织"></TabPane>
        <TabPane itemKey="message" tab="消息"></TabPane>
      </Tabs>
    </>
  );
};

export default Profile;
