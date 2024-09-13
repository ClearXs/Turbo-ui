import * as systemIcons from './collection';
import { IconProps } from '@douyinfe/semi-icons';
import * as semiIcons from '@douyinfe/semi-icons/lib/es/icons';
import _ from 'lodash';

export type Icon = {
  key: string;
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

export class IconoirModel implements IconModel {
  constructor(private icons: Map<string, Icon>) {}

  getIcons(): Map<string, Icon> {
    throw new Error('Method not implemented.');
  }
  getIconList(): Icon[] {
    throw new Error('Method not implemented.');
  }
  getIcon(key: string): Icon | undefined {
    throw new Error('Method not implemented.');
  }
}

const SemiIcons = new SemiIconsModel(new Map());
const SystemIcons = new SystemIconsModel(new Map());
const IconoirIcons = new SystemIconsModel(new Map());

const IconModels: Record<IconSystem, IconModel> = {
  semi: SemiIcons,
  system: SystemIcons,
  iconoir: IconoirIcons,
};

export const getIconModel = (type: IconSystem = 'semi'): IconModel => {
  return IconModels[type];
};

/**
 * 导入组件
 * @param icon icon名称
 * @param type 类型
 * @returns
 */
export const importIcon = (icon: string, type: IconSystem = 'semi') => {
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
  type: IconSystem = 'semi',
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
    return directGetIcon(icon, 'system', props);
  }
  return IconComponent;
};
