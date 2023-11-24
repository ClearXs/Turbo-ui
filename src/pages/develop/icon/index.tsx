// 基于semi的icon提供列表
import { Icon, IconSystem, getIconModle } from '@/components/Icon';
import { Col, Notification, Row, TabPane, Tabs } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import NoData from '../../error/NoData';

export type IconViewProps = {
  // 是否显示名称
  showName?: boolean;
  // 每一行的切分数量
  splitNum?: number;
  // 选中回调
  chooseIcon?: (key: string) => void;
};

const IconList: React.FC<IconViewProps> = ({
  showName = true,
  splitNum = 6,
  chooseIcon = (key) => {
    Notification.info({ position: 'top', content: key });
  },
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
              {renderIconViews(iconViews, showName, splitNum, chooseIcon)}
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

function renderIconViews(
  iconViews: Icon[][],
  showName = true,
  splitNum: number,
  chooseIcon?: (key: string) => void,
) {
  return (
    <>
      {iconViews.length > 0 ? (
        iconViews.map((icons) => {
          return (
            <>
              <Row gutter={24}>
                {icons.map((icon) => {
                  const IconComponent = icon.component;
                  return (
                    <Col span={24 / splitNum}>
                      {
                        <div
                          className="flex flex-col items-center gap-4 m-2 p-3 hover:bg-slate-100 hover:cursor-pointer"
                          onClick={() => {
                            // TODO 选择时的回调
                            chooseIcon && chooseIcon(icon.key);
                          }}
                        >
                          <IconComponent size="extra-large" />
                          {showName && <Text type="primary">{icon.key}</Text>}
                        </div>
                      }
                    </Col>
                  );
                })}
              </Row>
            </>
          );
        })
      ) : (
        <NoData />
      )}
    </>
  );
}
export default IconList;
