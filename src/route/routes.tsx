import _ from 'lodash';
import Post from '@/pages/system/post';
import Attachment from '@/pages/system/attachment';
import Tenant from '@/pages/system/tenant';
import Dictionary from '@/pages/system/dictionary';
import Role from '@/pages/system/role';
import Menu from '@/pages/system/menu';
import Org from '@/pages/system/org';
import User from '@/pages/system/user';
import ParamsComponent from '@/pages/system/params';
import MessageLogComponent from '@/pages/message/log';
import MessageTemplateComponent from '@/pages/message/template';
import MessageConfigComponent from '@/pages/message/config';
import Domain from '@/pages/developer/domain';
import DataSource from '@/pages/developer/datasource';
import Bo from '@/pages/developer/bo';
import Form from '@/pages/developer/form';
import Dataset from '@/pages/developer/dataset';
import Page from '@/pages/developer/page';
import StorageConfig from '@/pages/developer/storage-config';
import IconList from '@/pages/developer/icon';
import CodeGenerateTemplateComponent from '@/pages/developer/code-generate-template';
import CodeGenerateComponent from '@/pages/developer/code-generate';
import SequenceComponent from '@/pages/developer/sequence';
import { TurboRoute } from './AppRouter';
import Home from '@/pages/home';
import { importIcon } from '@/components/icon';
import Profile from '@/pages/profile';
import App from '@/App';
import Loading from '@/pages/Loading';
import { NavigateFunction } from 'react-router-dom';
import Login from '@/pages/login';

import * as auth from '@/util/auth';
import Chat from '@/pages/ai/chat';
import Model from '@/pages/ai/model';
import Agent from '@/pages/ai/agent';
import Tools from '@/pages/ai/tools';
import Credential from '@/pages/ai/credential';

const routes: TurboRoute[] = [
  {
    path: '/system/attachment',
    type: 'system',
    element: <Attachment />,
  },
  {
    path: '/system/post',
    type: 'system',
    element: <Post />,
  },
  {
    path: '/system/tenant',
    type: 'system',
    element: <Tenant />,
  },
  {
    path: '/system/dictionary',
    type: 'system',
    element: <Dictionary />,
  },
  {
    path: '/system/role',
    type: 'system',
    element: <Role />,
  },
  {
    path: '/system/menu',
    type: 'system',
    element: <Menu />,
  },
  {
    path: '/system/org',
    type: 'system',
    element: <Org />,
  },
  {
    path: '/system/user',
    type: 'system',
    element: <User />,
  },
  {
    path: '/message/log',
    type: 'system',
    element: <MessageLogComponent />,
  },
  {
    path: '/message/template',
    type: 'system',
    element: <MessageTemplateComponent />,
  },
  {
    path: '/message/config',
    type: 'system',
    element: <MessageConfigComponent />,
  },
  {
    path: '/system/params',
    type: 'system',
    element: <ParamsComponent />,
  },
  {
    path: '/developer/datasource',
    type: 'system',
    element: <DataSource />,
  },
  {
    path: '/developer/bo',
    type: 'system',
    element: <Bo />,
  },
  {
    path: '/developer/form',
    type: 'system',
    element: <Form />,
  },
  {
    path: '/developer/dataset',
    type: 'system',
    element: <Dataset />,
  },
  {
    path: '/developer/page',
    type: 'system',
    element: <Page />,
  },
  {
    path: '/developer/icon',
    type: 'system',
    element: <IconList />,
  },
  {
    path: '/developer/storageconfig',
    type: 'system',
    element: <StorageConfig />,
  },
  {
    path: '/developer/codeGenerateTemplate',
    type: 'system',
    element: <CodeGenerateTemplateComponent />,
  },
  {
    path: '/developer/codeGenerate',
    type: 'system',
    element: <CodeGenerateComponent />,
  },
  // 低代码领域页面
  {
    path: '/domain/:id',
    type: 'custom',
    element: <Domain />,
  },
  {
    path: '/developer/sequence',
    type: 'system',
    element: <SequenceComponent />,
  },

  {
    path: '/ai/chat',
    type: 'system',
    element: <Chat />,
  },
  {
    path: '/ai/model',
    type: 'system',
    element: <Model />,
  },

  {
    path: '/ai/agent',
    type: 'system',
    element: <Agent />,
  },
  {
    path: '/ai/tools',
    type: 'system',
    element: <Tools />,
  },
  {
    path: '/ai/credential',
    type: 'system',
    element: <Credential />,
  },
];

const IconHomeComponent = importIcon('IconHome');
const IconUserComponent = importIcon('IconUser');

export const HOME_ROUTE: TurboRoute = {
  id: '/home',
  code: 'home',
  path: '/home',
  name: '首页',
  element: <Home />,
  icon: IconHomeComponent && <IconHomeComponent />,
  clearable: false,
  type: 'system',
  depth: 0,
  topRouteKey: 'home',
};

export const PROFILE_ROUTE: TurboRoute = {
  id: '/profile',
  code: 'profile',
  path: '/profile',
  name: '个人档案',
  element: <Profile />,
  type: 'system',
  icon: IconUserComponent && <IconUserComponent />,
  clearable: true,
  attrs: ['hide'],
  topRouteKey: 'home',
};

export const APP_ROUTE: TurboRoute = {
  id: '/',
  path: '/',
  element: <App />,
  type: 'system',
  children: [HOME_ROUTE, PROFILE_ROUTE, ...routes],
  errorElement: <Loading />,
  intercept: (navigate: NavigateFunction) => {
    const authentication = auth.get();
    if (_.isEmpty(authentication)) {
      navigate('/login');
    } else {
      navigate('/home');
    }
    return false;
  },
};

export const LOGIN_ROUTE: TurboRoute = {
  id: 'login',
  path: '/login',
  element: <Login />,
  intercept: (navigate: NavigateFunction) => {
    const authentication = auth.get();
    if (!_.isEmpty(authentication)) {
      navigate('/');
      return false;
    }
    return true;
  },
  type: 'system',
};

export default [APP_ROUTE, LOGIN_ROUTE];
