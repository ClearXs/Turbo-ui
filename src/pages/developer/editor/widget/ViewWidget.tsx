import { observer } from '@formily/reactive-react';
import { useMemo } from 'react';
import { EditorProps, ViewType } from '../interface';
import { Tabs } from '@douyinfe/semi-ui';
import { tryGetIcon } from '@/components/icon';
import { PlainTab } from '@douyinfe/semi-ui/lib/es/tabs';
import { usePrefix, useWorkbench } from '@designable/react';
import cls from 'classnames';
import './styles.less';
import { DesignableProps } from '../Editor';

export type ViewWidgetProps = {
  editorProps: EditorProps;
  designableProps: DesignableProps;
};

const ViewWidget: React.FC<ViewWidgetProps> = observer(
  ({ editorProps, designableProps }) => {
    const workbench = useWorkbench();
    const prefix = usePrefix('view-widget');
    const { panels = [] } = editorProps;
    const viewKinds: PlainTab[] = useMemo(() => {
      return [
        {
          tab: '表单设计',
          itemKey: 'formDesign',
          icon: tryGetIcon('IconFormDesign'),
        },
        {
          tab: '数据视图',
          itemKey: 'dataView',
          icon: tryGetIcon('IconDataView'),
        },
        {
          tab: '页面设置',
          itemKey: 'pageSetting',
          icon: tryGetIcon('IconPageSetting'),
        },
        {
          tab: '数据管理',
          itemKey: 'dataManager',
          icon: tryGetIcon('IconDataManager'),
        },
      ];
    }, []);

    const tabList = viewKinds.filter((view) =>
      panels.includes(view.itemKey as ViewType),
    );

    return (
      tabList.length > 1 && (
        <div className={cls(prefix)}>
          <Tabs
            tabList={tabList}
            activeKey={designableProps.selectPanel}
            onTabClick={(key) => {
              designableProps.selectPanel = key as ViewType;
              if (designableProps.selectPanel === 'formDesign') {
                workbench.type = 'DESIGNABLE';
              } else if (designableProps.selectPanel === 'dataView') {
                workbench.type = 'CUSTOM_DESIGNABLE';
              } else if (
                designableProps.selectPanel === 'pageSetting' ||
                designableProps.selectPanel === 'dataManager'
              ) {
                workbench.type = 'CUSTOM_DESIGNABLE';
              }
            }}
          />
        </div>
      )
    );
  },
);

export default ViewWidget;
