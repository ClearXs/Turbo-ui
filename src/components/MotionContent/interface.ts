import { TabPaneProps } from '@douyinfe/semi-ui/lib/es/tabs';

export type UserTab = Omit<TabPaneProps, 'className' | 'children' | 'style'> & {
  path: string;
  topMenuKey: string;
};
