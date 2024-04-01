import { IdEntity } from '@/api';
import { FormColumnProps, RemoteProps } from '../../interface';
import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';
import { Constant } from '@/constant';

// Select 组件
export type FormSelectColumnProps<T extends IdEntity> = FormColumnProps<T> &
  Omit<SelectProps, 'optionList'> & {
    // 常量值
    optionList?: Constant[];
    // 字典项编码，如果开启则不使用optionList的值，并查询系统字典项接口进行渲染
    dictionary?: string;
    // 如果开启则不适用optionList与dic
    remote?: RemoteProps;
  };
