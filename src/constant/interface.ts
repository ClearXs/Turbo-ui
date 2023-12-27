import { TagColor } from '@douyinfe/semi-ui/lib/es/tag';

export type Constant = {
  // 常量关键值
  value: any;
  // 常量显示名称
  label: string;
  // 常量icon
  icon?: string;
  // 常量tag
  tag?: TagColor;
  // 常量额外显示内容
  extra?: string;
};
