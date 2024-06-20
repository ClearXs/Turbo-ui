import {
  BOWidget,
  CompositePanel,
  SettingsPanel,
  ViewPanel,
  ViewportPanel,
  Workspace,
  WorkspacePanel,
} from '@designable/react';
import DataViewForm from './DataViewForm/DataViewForm';
import TableCrud from '@/components/TableCrud';
import { useKernel } from '../kernel';
import { IdEntity } from '@/api';
import { observer } from '@formily/reactive-react';

const DataViewPanel = observer(() => {
  const kernel = useKernel();
  const dataView = kernel.getDataView();

  return (
    <>
      <CompositePanel>
        <CompositePanel.Item title="panels.Model" icon="Database">
          <BOWidget />
        </CompositePanel.Item>
      </CompositePanel>
      <Workspace id="form">
        <WorkspacePanel>
          <ViewportPanel>
            <ViewPanel type="CUSTOM_DESIGNABLE">
              {() => (
                <TableCrud<IdEntity>
                  mode="page"
                  search={{
                    disabled: true,
                    showSearch: false,
                    showReset: false,
                  }}
                  operability={false}
                  {...dataView}
                />
              )}
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
      </Workspace>
      <SettingsPanel title="panels.DataViewSettings">
        <DataViewForm />
      </SettingsPanel>
    </>
  );
});

export default DataViewPanel;
