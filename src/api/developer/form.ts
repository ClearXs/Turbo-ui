import useRequest from '@/hook/request';
import { CategoryEntity, GeneralApi, GeneralApiImpl } from '../interface';

export interface Form extends CategoryEntity {
  /**
   * 表单名称
   */
  name: string;

  /**
   * 表单编码
   */
  code: string;

  /**
   * 表单数据schema
   */
  schema: string;

  /**
   * boSchema
   */
  boSchema: string;

  /**
   * 所属于bo id
   */
  boId: string;

  /**
   * 分类id
   */
  categoryId: string;

  /**
   * 备注
   */
  remark: string;
}

export interface FormApi extends GeneralApi<Form> {
  publish(form: Form): Promise<Boolean>;
}

class FormApiImpl extends GeneralApiImpl<Form> implements FormApi {
  publish(form: Form): Promise<Boolean> {
    return this.request.post(this.apiPath + '/publish', form).then((res) => {
      return res.data;
    });
  }
}

export default function useFormApi(): FormApi {
  const request = useRequest();
  return new FormApiImpl('/api/dev/form', request);
}
