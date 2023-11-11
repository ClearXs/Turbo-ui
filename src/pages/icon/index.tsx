// 基于semi的icon提供列表
import { Icon, IconSystem, getIconModle } from '@/components/Icon';
import { Col, Collapse, Row, TabPane, Tabs } from '@douyinfe/semi-ui';
import { Suspense, useEffect, useState } from 'react';
import _ from 'lodash';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

type IconView = {
  icons: Icon[];
};

// 每一行的切分数量
const splitNum = 6;

const IconList: React.FC<{ chooseIcon: (key: string) => void }> = ({
  chooseIcon,
}) => {
  const iconSystem = ['semi', 'system'];

  const [iconTab, setIconTab] = useState<IconSystem>('semi');
  const [iconViews, setIconViews] = useState<Icon[][]>([]);

  useEffect(() => {
    const iconModel = getIconModle(iconTab);
    const icons = iconModel.getIconList();
    // 按照切分数量把其切分各个区块
    const iconChunk = _.chunk(icons, splitNum);
    setIconViews(iconChunk);
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
  iconViews: Icon[][],
  chooseIcon: (key: string) => void,
) {
  return (
    <>
      {iconViews.map((icons) => {
        return (
          <>
            <Row gutter={24}>
              {icons.map((icon) => {
                const IconComponent = icon.component;
                return (
                  <Col span={24 / splitNum}>
                    {
                      <Suspense>
                        <div
                          className="flex flex-col items-center gap-4 m-3 hover:bg-slate-100 hover:cursor-pointer"
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
          </>
        );
      })}
    </>
  );
}
export default IconList;
