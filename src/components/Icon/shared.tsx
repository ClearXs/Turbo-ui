import * as systemIcons from './collection';
import { IconProps } from '@douyinfe/semi-icons';
import * as semiIcons from '@douyinfe/semi-icons/lib/es/icons';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { ICON_COOKIES_KEY } from './constant';

export type Icon = {
  key: string;
  component: any;
};

export type IconKey = 'semi' | 'system' | 'custom';

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

export class SemiIconsModel implements IconModel {
  constructor(private icons: Map<string, Icon>) {
    for (const key in semiIcons) {
      const icon = semiIcons[key];
      this.icons.set(key, { key, component: icon });
    }
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

export class SystemIconsModel implements IconModel {
  constructor(private icons: Map<string, Icon>) {
    for (const key in systemIcons) {
      const icon = systemIcons[key];
      this.icons.set(key, { key, component: icon });
    }
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

export class CustomModel implements IconModel {
  constructor(private icons: Map<string, Icon>) {}

  getIcons(): Map<string, Icon> {
    this.icons.clear();
    const icons = Cookies.get(ICON_COOKIES_KEY);
    if (icons) {
      const iconKeys: string[] = JSON.parse(icons);
      const deduplicateIconKeys = new Set(iconKeys);
      for (const key of deduplicateIconKeys) {
        this.icons.set(key, {
          key,
          component: () => <span className={`${key}`} />,
        });
      }
    }
    return this.icons;
  }
  getIconList(): Icon[] {
    const icons = this.getIcons();
    const iconList = new Array();
    const values = icons.values();
    for (let v of values) {
      iconList.push(v);
    }
    return iconList;
  }

  getIcon(key: string): Icon | undefined {
    return this.getIcons().get(key);
  }
}

const SemiIcons = new SemiIconsModel(new Map());
const SystemIcons = new SystemIconsModel(new Map());
const CustomIcons = new CustomModel(new Map());

const IconModels: Record<IconKey, IconModel> = {
  semi: SemiIcons,
  system: SystemIcons,
  custom: CustomIcons,
};

export const getIconModel = (type: IconKey = 'semi'): IconModel => {
  return IconModels[type];
};

/**
 * 导入组件
 * @param icon icon名称
 * @param type 类型
 * @returns
 */
export const importIcon = (icon: string, type: IconKey = 'semi') => {
  const iconModel = getIconModel(type);
  return iconModel.getIcon(icon)?.component;
};

/**
 * 直接获取Icon组件
 * @param icon icon名称
 * @param type icon系统的类型
 * @returns Component
 */
export const directGetIcon = (
  icon: string | undefined,
  type: IconKey = 'semi',
  props: Partial<IconProps> = {},
): React.ReactNode | undefined => {
  if (icon === undefined) {
    return null;
  }
  const iconModel = getIconModel(type);
  const IconComponent = iconModel.getIcon(icon)?.component;
  return IconComponent && <IconComponent {...props} />;
};

/**
 * try best hard get icon, first from semi icon system, if not found then from system get icon
 *
 * @param icon the icon
 */
export const tryGetIcon = (
  icon: string | undefined,
  props: Partial<IconProps> = {},
): React.ReactNode | undefined => {
  let IconComponent = directGetIcon(icon, 'semi', props);
  if (_.isEmpty(IconComponent)) {
    IconComponent = directGetIcon(icon, 'system', props);
  }
  if (_.isEmpty(IconComponent)) {
    IconComponent = directGetIcon(icon, 'custom', props);
  }
  return IconComponent;
};
