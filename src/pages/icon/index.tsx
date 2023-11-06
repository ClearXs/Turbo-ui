// 基于semi的icon提供列表
import { Icon, IconSystem, getIconModle, importIcon } from '@/components/Icon';
import { IconSearch } from '@douyinfe/semi-icons';
import { Col, Collapse, Input, Row, TabPane, Tabs } from '@douyinfe/semi-ui';
import { Suspense, lazy, useEffect, useState } from 'react';
import _ from 'lodash';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

type IconView = {
  type: string;
  // 按照行切分划分
  icons: Icon[][];
};

// 每一行的切分数量
const splitNum = 8;

const IconList: React.FC<{ chooseIcon: (key: string) => void }> = ({
  chooseIcon,
}) => {
  const iconSystem = ['semi', 'system'];

  const [iconTab, setIconTab] = useState<IconSystem>('semi');
  const [iconViews, setIconViews] = useState<IconView[]>([]);

  useEffect(() => {
    const iconModel = getIconModle(iconTab);
    const icons = iconModel.getIconList();
    const groupIconByKey = _.groupBy(icons, (icon) => {
      return icon.type;
    });
    const initialIconView = new Array<IconView>();
    // 切分icon区块
    for (const gk in groupIconByKey) {
      const groupList = groupIconByKey[gk];
      const iconChunk = _.chunk(groupList, splitNum);
      initialIconView.push({ type: gk, icons: iconChunk });
    }
    setIconViews(initialIconView);
  }, [iconTab]);

  return (
    <>
      <Tabs
        activeKey={iconTab}
        onChange={(ak) => {
          setIconTab(ak as IconSystem);
        }}
        type="card"
      >
        {iconSystem.map((type) => {
          return (
            <TabPane itemKey={type} tab={type}>
              {renderIconViews(iconViews, chooseIcon)}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

function renderIconViews(
  iconViews: IconView[],
  chooseIcon: (key: string) => void,
) {
  return (
    <>
      <Collapse>
        {iconViews.map((views) => {
          return (
            <>
              <Collapse.Panel
                header={views.type}
                itemKey={views.type}
                showArrow
              >
                {views.icons.map((icons) => {
                  return (
                    <Row>
                      {icons.map((icon) => {
                        const IconComponent = icon.component;
                        return (
                          <Col span={24 / splitNum}>
                            {
                              <Suspense>
                                <div
                                  className="flex flex-col items-center gap-2 m-3 hover:bg-slate-100 hover:cursor-pointer"
                                  onClick={() => {
                                    // TODO 选择时的回调
                                    chooseIcon && chooseIcon(icon.key);
                                  }}
                                >
                                  <IconComponent size="extra-large" />
                                  <Text type="primary">{icon.key}</Text>
                                </div>
                              </Suspense>
                            }
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
              </Collapse.Panel>
            </>
          );
        })}
      </Collapse>
    </>
  );
}
export default IconList;
