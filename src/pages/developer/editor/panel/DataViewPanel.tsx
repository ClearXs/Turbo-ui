import {
  BOWidget,
  CompositePanel,
  SettingsPanel,
  ViewPanel,
  ViewportPanel,
} from '@designable/react';

const DataViewPanel = () => {
  return (
    <>
      <CompositePanel>
        <CompositePanel.Item title="panels.Model" icon="Database">
          <BOWidget />
        </CompositePanel.Item>
      </CompositePanel>
      <ViewportPanel>
        <ViewPanel type="CUSTOM"></ViewPanel>
      </ViewportPanel>
      <SettingsPanel></SettingsPanel>
    </>
  );
};

export default DataViewPanel;
