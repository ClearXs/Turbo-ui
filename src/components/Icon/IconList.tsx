// 基于semi的icon提供列表
import { Icon, IconKey, getIconModel } from '@/components/icon/shared';
import {
  Button,
  Col,
  Empty,
  Input,
  Notification,
  Row,
  Spin,
  TabPane,
  Tabs,
  Tooltip,
} from '@douyinfe/semi-ui';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import _ from 'lodash';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { IllustrationConstruction } from '@douyinfe/semi-illustrations';
import copy from 'clipboard-copy';
import UniForm from '@/components/uni-form/UniForm';
import { Entity } from '@/api';
import {
  IconApps,
  IconMore,
  IconPlusCircle,
  IconSemiLogo,
} from '@douyinfe/semi-icons';
import { ICON_COOKIES_KEY } from './constant';
import Cookies from 'js-cookie';
import './icon.scss';
import Modular from '../modular';

export type IconViewProps = {
  // 是否以tooltip形式显示名称
  tooltip?: boolean;
  // 是否显示名称
  showName?: boolean;
  // 每一行的切分数量
  splitNum?: number;
  // 选中回调
  chooseIcon?: (key: string) => void;
};

export type CustomIcon = Entity & { icon: string };

type IconTab = { key: IconKey; tab: ReactNode };

const IconList: React.FC<IconViewProps> = ({
  tooltip = false,
  showName = true,
  splitNum = 6,
  chooseIcon = (key) => {
    copy(key);
    Notification.info({
      position: 'top',
      content: `Copy icon '${key}' to pasteboard`,
    });
  },
}) => {
  const [iconKey, setIconKey] = useState<IconKey>('semi');
  const [iconViews, setIconViews] = useState<Icon[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tabs: IconTab[] = useMemo(() => {
    return [
      {
        key: 'semi',
        tab: (
          <div>
            <Tooltip content="内置semi logo">
              <IconSemiLogo />
              <span>semi</span>
            </Tooltip>
          </div>
        ),
      },
      {
        key: 'system',
        tab: (
          <div>
            <Tooltip content="内置系统图标">
              <IconApps />
              <span>内置</span>
            </Tooltip>
          </div>
        ),
      },
      {
        key: 'custom',
        tab: (
          <div className="flex flex-row gap-2 items-center">
            <Tooltip content="使用 iconify 自定义图标 icon 信息将会存储在 cookies中">
              <IconPlusCircle />
              <span>自定义</span>
            </Tooltip>

            <Tooltip content="添加更多 iconify 图标">
              <Button
                icon={<IconMore />}
                theme="borderless"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  const form = UniForm.open<CustomIcon>({
                    mode: 'simply',
                    columns: [
                      {
                        field: 'icon',
                        label: '图标',
                        type: 'input',
                        extraText:
                          'iconify 图标的名称，比如说 <span className="icon-[material-symbols--123]" 取 icon-[material-symbols--123] 填写/>',
                        require: true,
                      },
                    ],
                    onOk(formContext) {
                      const values = formContext.getValues();
                      const customIconKeysString =
                        Cookies.get(ICON_COOKIES_KEY);

                      let customIconKeys = new Set<string>();
                      if (customIconKeysString) {
                        const customIconKeysInCookies =
                          JSON.parse(customIconKeysString);
                        customIconKeysInCookies.forEach((key: string) =>
                          customIconKeys.add(key),
                        );
                      }
                      if (!_.isEmpty(values.icon)) {
                        customIconKeys.add(values.icon!);
                        const icons: string[] = [];
                        customIconKeys.forEach((key) => icons.push(key));
                        Cookies.set(ICON_COOKIES_KEY, JSON.stringify(icons));
                        Notification.success({
                          type: 'success',
                          content: '添加成功',
                        });
                      }
                      if (iconKey === 'custom') {
                        loadIcons('custom');
                      }

                      form.close();
                    },
                  });
                }}
              ></Button>
            </Tooltip>
          </div>
        ),
      },
    ];
  }, [iconKey]);

  const iconsRef = useRef<Icon[]>();

  useEffect(() => loadIcons(iconKey), [iconKey]);

  const search = useCallback((text: string) => {
    const icons = iconsRef.current?.filter((icon) =>
      icon.key.toLowerCase().includes(text.toLowerCase()),
    );
    // 按照切分数量把其切分各个区块
    const iconChunk = _.chunk(icons, splitNum);
    setIconViews(iconChunk);
  }, []);

  const loadIcons = useCallback(
    (iconKey: IconKey) => {
      setLoading(true);
      const iconModel = getIconModel(iconKey);
      const icons = iconModel.getIconList();
      iconsRef.current = icons;
      // 按照切分数量把其切分各个区块
      const iconChunk = _.chunk(icons, splitNum);
      setIconViews(iconChunk);
      setLoading(false);
    },
    [iconKey],
  );

  return (
    <Spin spinning={loading}>
      <Tabs
        activeKey={iconKey}
        onChange={(ak) => {
          setIconKey(ak as IconKey);
        }}
        tabPosition="left"
        className="w-[100%] h-[100%]"
      >
        {tabs.map((tab) => {
          return (
            <TabPane itemKey={tab.key} tab={tab.tab}>
              <div className="w-[20%] flex items-start m-2 justify-center">
                <Input placeholder="请输入图标名" onChange={search}></Input>
              </div>
              {iconViews.length > 0 ? (
                <div className="h-[80vh] overflow-y-auto overflow-x-hidden">
                  {iconViews.map((icons) => {
                    return (
                      <Row gutter={24}>
                        {icons.map((icon) => {
                          const IconComponent = icon.component;
                          const IconView = (
                            <div
                              className="flex flex-col items-center gap-4 m-2 p-3 hover:bg-[var(--semi-color-border)] hover:cursor-pointer x-group"
                              onClick={() => {
                                // TODO 选择时的回调
                                chooseIcon?.(icon.key);
                              }}
                            >
                              <IconComponent size="extra-large" />
                              {showName && (
                                <Text type="primary">{icon.key}</Text>
                              )}
                              {iconKey === 'custom' && (
                                <div
                                  className="absolute right-3 top-1 x-group w-3 h-3 x-shape"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    Modular.show({
                                      title: `删除${icon.key}`,
                                      content: '确认删除该图标吗？',
                                      size: 'small',
                                      onConfirm: () => {
                                        const customIconKeysString =
                                          Cookies.get(ICON_COOKIES_KEY);
                                        let customIconKeys = new Set<string>();
                                        if (customIconKeysString) {
                                          const customIconKeysInCookies =
                                            JSON.parse(customIconKeysString);
                                          customIconKeysInCookies.forEach(
                                            (key: string) =>
                                              customIconKeys.add(key),
                                          );
                                        }
                                        customIconKeys.delete(icon.key);
                                        const icons: string[] = [];
                                        customIconKeys.forEach((key) =>
                                          icons.push(key),
                                        );
                                        Cookies.set(
                                          ICON_COOKIES_KEY,
                                          JSON.stringify(icons),
                                        );
                                        if (iconKey === 'custom') {
                                          loadIcons('custom');
                                        }
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          );

                          return (
                            <Col span={24 / splitNum}>
                              {tooltip == true ? (
                                <Tooltip content={icon.key}>{IconView}</Tooltip>
                              ) : (
                                IconView
                              )}
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
                </div>
              ) : (
                <Empty
                  className="h-[100%] justify-center"
                  image={<IllustrationConstruction />}
                  description={<Text type="quaternary">暂无数据</Text>}
                />
              )}
            </TabPane>
          );
        })}
      </Tabs>
    </Spin>
  );
};

export default IconList;
