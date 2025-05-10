import { TabPane, Tabs } from '@douyinfe/semi-ui';
import { useState } from 'react';
import UserProfile from './UserProfile';
import MyRole from './MyRole';
import MyPost from './MyPost';

import IconText from '@/components/text/IconText';
import { directGetIcon } from '@/components/icon/shared';
import { observer } from 'mobx-react';
import _ from 'lodash';

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
        <TabPane
          itemKey="profile"
          tab={<IconText icon={directGetIcon('IconUser')}>我的信息</IconText>}
        >
          <UserProfile />
        </TabPane>
        <TabPane
          itemKey="password"
          tab={<IconText icon={directGetIcon('IconLock')}>安全</IconText>}
        ></TabPane>
        <TabPane
          itemKey="role"
          tab={
            <IconText icon={directGetIcon('IconBottomCenterStroked')}>
              我的角色
            </IconText>
          }
        >
          <MyRole />
        </TabPane>
        <TabPane
          itemKey="post"
          tab={
            <IconText icon={directGetIcon('IconBottomCenterStroked')}>
              我的岗位
            </IconText>
          }
        >
          <MyPost />
        </TabPane>
        <TabPane
          itemKey="org"
          tab={
            <IconText icon={directGetIcon('IconOrgManager', 'system')}>
              我的组织
            </IconText>
          }
        ></TabPane>
        <TabPane
          itemKey="message"
          tab={
            <IconText icon={directGetIcon('IconMailStroked1')}>
              我的消息
            </IconText>
          }
        ></TabPane>
      </Tabs>
    </>
  );
};

export default observer(Profile);
