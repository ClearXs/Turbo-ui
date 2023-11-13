import { lazy } from 'react';

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

export class SemiIconsModle implements IconModel {
  constructor(private icons: Map<string, Icon>) {
    // 从semi库里面导入UI组件
    const semiIconImports = import.meta.glob(
      '../../../node_modules/@douyinfe/semi-icons/lib/es/icons/*',
    );
    Object.keys(semiIconImports)
      .filter((iconFileName) => {
        return iconFileName.match('Icon.*.js') !== null;
      })
      .map((iconKey) => {
        // 形如../../../node_modules/@douyinfe/semi-icons/lib/es/icons/IconPieChart2Stroked.js形式
        const lastSlashIndex = iconKey.lastIndexOf('/Icon');
        const suffixIndex = iconKey.lastIndexOf('.js');
        // IconPieChart2Stroked ===> PieChart2Stroked
        const key = iconKey.substring(lastSlashIndex + 1, suffixIndex);
        const component = lazy(semiIconImports[iconKey]);
        return {
          key,
          component,
        } as Icon;
      })
      .forEach((icon) => {
        this.icons.set(icon.key, icon);
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

export class SystemIconsModle implements IconModel {
  constructor(private icons: Map<string, Icon>) {
    this.icons.set('IconMessage', {
      key: 'IconMessage',
      component: lazy(() => import('./IconMessage')),
    });
    this.icons.set('IconTheme', {
      key: 'IconTheme',
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

/**
 * 直接获取Icon组件
 * @param icon icon名称
 * @param type icon系统的类型
 * @returns Component
 */
export const directGetIcon = (
  icon: string,
  type: IconSystem = 'semi',
): React.ReactNode => {
  const iconModel = getIconModle(type);
  const IconComponent = iconModel.getIcon(icon)?.component;
  return IconComponent && <IconComponent />;
};
