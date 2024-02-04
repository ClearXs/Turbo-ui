import { SettingsPanel, ViewPanel, ViewportPanel } from '@designable/react';

const DataManagerPanel = () => {
  return (
    <>
      <ViewportPanel>
        <ViewPanel type="CUSTOM"></ViewPanel>
      </ViewportPanel>
      <SettingsPanel></SettingsPanel>
    </>
  );
};

export default DataManagerPanel;
