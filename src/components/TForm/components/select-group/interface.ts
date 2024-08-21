import { IdEntity } from '@/api';
import { FormColumnProps, RemoteProps } from '../../interface';
import { GroupConstant } from '@/constant';

// Select Group 组件
export type FormSelectGroupColumnProps<T extends IdEntity> =
  FormColumnProps<T> & {
    // 是否可搜索
    filter?: boolean;
    // 是否多选
    multiple?: boolean;
    // 常量值
    optionList?: GroupConstant[];
    // 远端搜索
    remote?: RemoteProps;
  };
