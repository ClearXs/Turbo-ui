import {
  ViewPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  OutlineTreeWidget,
  ResourceWidget,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  SettingsPanel,
  HistoryWidget,
  BOWidget,
  ComponentTreeWidget,
} from '@clearx/designable-react';
import {
  Form,
  Field,
  Input,
  Password,
  NumberPicker,
  Select,
  TreeSelect,
  Cascader,
  Transfer,
  Checkbox,
  Radio,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  ObjectContainer,
  Card,
  FormGrid,
  FormTab,
  FormLayout,
  FormCollapse,
  Space,
  ArrayCards,
  ArrayTable,
  Text,
  Rate,
  Slider,
} from '@clearx/designable-formily-semi';
import { Icon } from '../components/icon';
import { Color } from '../components/color';
import { observer } from 'mobx-react';
import { SettingsForm } from '@clearx/designable-react-settings-form';
import { PreviewWidget } from '../widget/PreviewWidget';
import { MarkupSchemaWidget } from '../widget/MarkupSchemaWidget';
import { BoSchemaEditorWidget } from '../widget/BoSchemaEditorWidget';
import { SchemaEditorWidget } from '../widget/SchemaEditorWidget';

const FormDesignPanel = observer(() => {
  return (
    <>
      <CompositePanel>
        <CompositePanel.Item title="panels.Component" icon="Component">
          <ResourceWidget
            title="sources.Inputs"
            sources={[
              Input,
              Password,
              NumberPicker,
              Select,
              TreeSelect,
              Cascader,
              Transfer,
              Checkbox,
              Radio,
              Rate,
              Slider,
              DatePicker,
              TimePicker,
              Upload,
              Switch,
              Color,
              Icon,
              ObjectContainer,
            ]}
          />
          <ResourceWidget
            title="sources.Layouts"
            sources={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
          />
          <ResourceWidget
            title="sources.Arrays"
            sources={[ArrayCards, ArrayTable]}
          />
          <ResourceWidget title="sources.Displays" sources={[Text]} />
        </CompositePanel.Item>
        <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
          <OutlineTreeWidget />
        </CompositePanel.Item>
        <CompositePanel.Item title="panels.History" icon="History">
          <HistoryWidget />
        </CompositePanel.Item>
        <CompositePanel.Item title="panels.Model" icon="Database">
          <BOWidget />
        </CompositePanel.Item>
      </CompositePanel>
      <WorkspacePanel>
        <ToolbarPanel>
          <DesignerToolsWidget />
          <ViewToolsWidget
            use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW', 'BOTREE']}
          />
        </ToolbarPanel>
        <ViewportPanel>
          <ViewPanel type="DESIGNABLE">
            {() => (
              <ComponentTreeWidget
                components={{
                  Form,
                  Field,
                  Input,
                  Select,
                  TreeSelect,
                  Cascader,
                  Radio,
                  Checkbox,
                  NumberPicker,
                  Transfer,
                  Password,
                  DatePicker,
                  TimePicker,
                  Upload,
                  Switch,
                  Text,
                  Card,
                  ArrayCards,
                  ArrayTable,
                  Space,
                  FormTab,
                  FormCollapse,
                  FormGrid,
                  FormLayout,
                  ObjectContainer,
                  Rate,
                  Slider,
                  Color,
                  Icon,
                }}
              />
            )}
          </ViewPanel>
          <ViewPanel type="JSONTREE" scrollable={false}>
            {(tree, bo, onChange) => (
              <SchemaEditorWidget tree={tree} onChange={onChange} />
            )}
          </ViewPanel>
          <ViewPanel type="BOTREE" scrollable={false}>
            {(tree, bo, onChange) => (
              <BoSchemaEditorWidget bo={bo} onChange={onChange} />
            )}
          </ViewPanel>
          <ViewPanel type="MARKUP" scrollable={false}>
            {(tree) => <MarkupSchemaWidget tree={tree} />}
          </ViewPanel>
          <ViewPanel type="PREVIEW">
            {(tree) => {
              return <PreviewWidget tree={tree} />;
            }}
          </ViewPanel>
        </ViewportPanel>
      </WorkspacePanel>
      <SettingsPanel title="panels.PropertySettings">
        <SettingsForm />
      </SettingsPanel>
    </>
  );
});

export default FormDesignPanel;
