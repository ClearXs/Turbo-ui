import useRequest from '@/hook/request';
import {
  CategoryEntity,
  GeneralApi,
  GeneralApiImpl,
  R,
  TenantEntity,
} from '../interface';
import { DataView } from '@/pages/developer/editor/kernel';

export interface Page extends TenantEntity, CategoryEntity {
  /**
   * 页面名称
   */
  name: string;

  /**
   * 页面code
   */
  code: string;

  /**
   * 页面路由
   */
  route: string;

  /**
   * 数据集id
   */
  datasetId: string;

  /**
   * 数据视图
   */
  dataview: string;

  /**
   * bo
   */
  boId: string;

  /**
   * 表单
   */
  formId: string;

  /**
   * 分类id
   */
  categoryId: string;
}

export interface PageApi extends GeneralApi<Page> {
  deploy: (page: Page, menuId: string) => Promise<R<Boolean>>;
  dataView: (pageId: string) => Promise<R<DataView>>;
}

class PageApiImpl extends GeneralApiImpl<Page> implements PageApi {
  dataView(pageId: string): Promise<R<DataView>> {
    return this.request
      .get(this.apiPath + `/dataView/${pageId}`)
      .then((res) => {
        return res.data;
      });
  }

  deploy(page: Page, menuId: string): Promise<R<Boolean>> {
    return this.request
      .post(this.apiPath + `/deploy/${menuId}`, page)
      .then((res) => {
        return res.data;
      });
  }
}

export default function usePageApi(): PageApi {
  const request = useRequest();
  return new PageApiImpl('/api/dev/page', request);
}
