import { GeneralApi, GeneralApiImpl, R, TenantEntity } from '..';
import useRequest from '@/hook/request';
import { Role } from './role';
import { Org } from './org';
import { Post } from './post';

export type User = TenantEntity & {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: number;
  nickname: string;
  avatar: string;
  status: string;
  orgId: string;
  source: 'THIRD' | 'SELF-BUILT';
};

export type UserVO = User & {
  roles: Role[];
  org: Org;
  posts: Post[];
};

export interface UserApi extends GeneralApi<User> {
  /**
   * 锁定
   * @param id 用户id
   */
  lock: (id: User['id']) => Promise<R<Boolean>>;

  /**
   * 激活
   * @param id 用户id
   */
  active: (id: User['id']) => Promise<R<Boolean>>;

  /**
   * 更改密码
   * @param id 用户id
   * @param newPassword 新密码
   */
  changePassword: (
    id: User['id'],
    rawPassword: User['password'],
    newPassword: User['password'],
  ) => Promise<R<Boolean>>;

  /**
   * 绑定角色
   * @param userId 用户id
   * @param roleIds 角色id
   * @returns
   */
  bindingRole: (
    userId: User['id'],
    roleIds: Role['id'][],
  ) => Promise<R<Boolean>>;

  /**
   * 绑定组织
   * @param userId 用户id
   * @param orgId 组织id
   * @returns
   */
  bindingOrg: (userId: User['id'], orgId: Org['id']) => Promise<R<Boolean>>;

  /**
   * 绑定岗位
   * @param userId 用户id
   * @param postIds 岗位id
   * @returns
   */
  bindingPost: (
    userId: User['id'],
    postIds: Post['id'][],
  ) => Promise<R<Boolean>>;
}

class UserApiImpl extends GeneralApiImpl<User> implements UserApi {
  bindingRole(userId: string, roleIds: string[]): Promise<R<Boolean>> {
    return this.request
      .post(this.apiPath + '/binding-role', { userId, roleIds })
      .then((res) => {
        return res.data;
      });
  }

  bindingOrg(userId: string, orgId: string): Promise<R<Boolean>> {
    return this.request
      .post(this.apiPath + '/binding-org', { userId, orgId })
      .then((res) => {
        return res.data;
      });
  }

  bindingPost(userId: string, postIds: string[]): Promise<R<Boolean>> {
    return this.request
      .post(this.apiPath + '/binding-post', { userId, postIds })
      .then((res) => {
        return res.data;
      });
  }

  lock(id: string): Promise<R<Boolean>> {
    return this.request.get(this.apiPath + '/lock', { id }).then((res) => {
      return res.data;
    });
  }

  active(id: string): Promise<R<Boolean>> {
    return this.request.get(this.apiPath + '/active', { id }).then((res) => {
      return res.data;
    });
  }

  changePassword(
    id: string,
    rawPassword: string,
    newPassword: string,
  ): Promise<R<Boolean>> {
    return this.request
      .post(this.apiPath + '/change-password', {
        id,
        rawPassword,
        newPassword,
      })
      .then((res) => {
        return res.data;
      });
  }
}

function useUserApi(): UserApi {
  const request = useRequest();
  return new UserApiImpl('/api/sys/user', request);
}

export default useUserApi;
