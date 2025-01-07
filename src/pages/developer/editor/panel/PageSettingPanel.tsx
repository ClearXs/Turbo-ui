import {
  SettingsPanel,
  ViewPanel,
  ViewportPanel,
} from '@clearx/designable-react';

const PageSettingPanel = () => {
  return (
    <>
      <ViewportPanel>
        <ViewPanel type="CUSTOM"></ViewPanel>
      </ViewportPanel>
      <SettingsPanel></SettingsPanel>
    </>
  );
};

export default PageSettingPanel;
