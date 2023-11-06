import { IconProps } from '@douyinfe/semi-icons';
import { ComponentType, LazyExoticComponent, lazy } from 'react';

export type Icon = {
  key: string;
  type:
    | 'Accessibility'
    | 'Alert'
    | 'Arrow'
    | 'Basis'
    | 'Brands'
    | 'Building'
    | 'Code'
    | 'Communication'
    | 'Device'
    | 'Files&Folder'
    | 'Interface'
    | 'Layout'
    | 'Music'
    | 'Object'
    | 'Photo&Video'
    | 'Time'
    | 'User'
    | 'Writing';
  component: any;
};

export type IconSystem = 'semi' | 'system';

export interface IconModel {
  /**
   * 获取当前实例的Icon
   */
  getIcons(): Map<string, Icon>;

  /**
   * 获取Icon列表
   */
  getIconList(): Icon[];

  /**
   * 根据icon key的标识获取Icon实例
   * @param key icon key
   */
  getIcon(key: string): Icon | undefined;
}

export class SemiIconsModle implements IconModel {
  constructor(private icons: Map<string, Icon>) {
    this.initSemiAccessibility();
    this.initSemiAlert();
    this.initSemiBuilding();
  }

  getIconList(): Icon[] {
    const iconList = new Array();
    const values = this.icons.values();
    for (let v of values) {
      iconList.push(v);
    }
    return iconList;
  }

  getIcons(): Map<string, Icon> {
    return this.icons;
  }
  getIcon(key: string): Icon | undefined {
    return this.icons.get(key);
  }

  initSemiAccessibility() {
    this.icons.set('IconLanguage', {
      key: 'IconLanguage',
      type: 'Accessibility',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconLanguage'),
      ),
    });
    this.icons.set('IconHelpCircle', {
      key: 'IconHelpCircle',
      type: 'Accessibility',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconHelpCircle'),
      ),
    });
    this.icons.set('IconInfoCircle', {
      key: 'IconInfoCircle',
      type: 'Accessibility',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconInfoCircle'),
      ),
    });
    this.icons.set('IconCustomerSupport', {
      key: 'IconCustomerSupport',
      type: 'Accessibility',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconCustomerSupport'),
      ),
    });
  }

  initSemiAlert() {
    this.icons.set('IconBell', {
      key: 'IconBell',
      type: 'Alert',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconBell'),
      ),
    });
    this.icons.set('IconAlertCircle', {
      key: 'IconAlertCircle',
      type: 'Alert',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconAlertCircle'),
      ),
    });
    this.icons.set('IconAlertTriangle', {
      key: 'IconAlertTriangle',
      type: 'Alert',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconAlertTriangle'),
      ),
    });
  }

  initSemiBuilding() {
    this.icons.set('IconHome', {
      key: 'IconHome',
      type: 'Building',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconHome'),
      ),
    });
    this.icons.set('IconApartment', {
      key: 'IconApartment',
      type: 'Building',
      component: lazy(
        () => import('@douyinfe/semi-icons/lib/es/icons/IconApartment'),
      ),
    });
  }
}

export class SystemIconsModle implements IconModel {
  constructor(private icons: Map<string, Icon>) {
    this.icons.set('IconMessage', {
      key: 'IconMessage',
      type: 'Accessibility',
      component: lazy(() => import('./IconMessage')),
    });
    this.icons.set('IconTheme', {
      key: 'IconTheme',
      type: 'Accessibility',
      component: lazy(() => import('./IconTheme')),
    });
  }

  getIconList(): Icon[] {
    const iconList = new Array();
    const values = this.icons.values();
    for (let v of values) {
      iconList.push(v);
    }
    return iconList;
  }

  getIcons(): Map<string, Icon> {
    return this.icons;
  }
  getIcon(key: string): Icon | undefined {
    return this.icons.get(key);
  }
}

const SemiIcons = new SemiIconsModle(new Map());
const SystemIcons = new SystemIconsModle(new Map());

export const getIconModle = (type: IconSystem = 'semi'): IconModel => {
  return type === 'semi' ? SemiIcons : SystemIcons;
};

/**
 * 导入组件
 * @param icon icon名称
 * @param type 类型
 * @returns
 */
export const importIcon = (icon: string, type: IconSystem = 'semi') => {
  const iconModel = getIconModle(type);
  return iconModel.getIcon(icon)?.component;
};

const getIcon = (key: string, type: Icon['type'], component: any): Icon => {
  return { key, type, component };
};
