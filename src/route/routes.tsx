import _ from 'lodash';
import Post from '@/pages/system/post';
import Attachment from '@/pages/system/attachment';
import Tenant from '@/pages/system/tenant';
import Dictionary from '@/pages/system/dictionary';
import Role from '@/pages/system/role';
import Menu from '@/pages/system/menu';
import Org from '@/pages/system/org';
import User from '@/pages/system/user';
import Params from '@/pages/system/params';
import MessageLogComponent from '@/pages/message/log';
import MessageTemplateComponent from '@/pages/message/template';
import MessageConfigComponent from '@/pages/message/config';
import Domain from '@/pages/developer/domain';
import DataSource from '@/pages/developer/datasource';
import Bo from '@/pages/developer/bo';
import Form from '@/pages/developer/form';
import Dataset from '@/pages/developer/dataset';
import Page from '@/pages/developer/page';
import Cloudstorageconfig from '@/pages/developer/cloudstorageconfig';
import IconList from '@/pages/developer/icon';

// 预定义加载组件
type PreviewRoute = {
  path: string;
  element: React.ReactNode;
};

export default [
  {
    path: '/system/attachment',
    element: <Attachment />,
  },
  {
    path: '/system/post',
    element: <Post />,
  },
  {
    path: '/system/tenant',
    element: <Tenant />,
  },
  {
    path: '/system/dictionary',
    element: <Dictionary />,
  },
  {
    path: '/system/role',
    element: <Role />,
  },
  {
    path: '/system/menu',
    element: <Menu />,
  },
  {
    path: '/system/org',
    element: <Org />,
  },
  {
    path: '/system/user',
    element: <User />,
  },
  {
    path: '/message/log',
    element: <MessageLogComponent />,
  },
  {
    path: '/message/template',
    element: <MessageTemplateComponent />,
  },
  {
    path: '/message/config',
    element: <MessageConfigComponent />,
  },
  {
    path: '/system/params',
    element: <Params />,
  },
  {
    path: '/developer/datasource',
    element: <DataSource />,
  },
  {
    path: '/developer/bo',
    element: <Bo />,
  },
  {
    path: '/developer/form',
    element: <Form />,
  },
  {
    path: '/developer/dataset',
    element: <Dataset />,
  },
  {
    path: '/developer/page',
    element: <Page />,
  },
  {
    path: '/developer/icon',
    element: <IconList />,
  },
  {
    path: '/developer/cloudstorageconfig',
    element: <Cloudstorageconfig />,
  },
  // 低代码领域页面
  {
    path: '/domain/:id',
    element: <Domain />,
  },
] as PreviewRoute[];
