import { TagColor } from '@douyinfe/semi-ui/lib/es/tag';

export type Constant<Value = any> = {
  // 常量关键值
  value: Value;
  // 常量显示名称
  label: string;
  // 常量icon
  icon?: React.ReactNode;
  // 常量tag
  tag?: TagColor;
  // 常量额外显示内容
  extra?: string;
};

// 构成group的常量
export type GroupConstant<Value = any> = Constant<Value> & {
  group: Constant<Value>;
};

export type TreeConstant<Value = any> = Constant<Value> & {
  depth: number;
  children?: TreeConstant<Value>[];
};
