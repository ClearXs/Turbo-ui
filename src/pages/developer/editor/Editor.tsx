import { useEffect, useMemo } from 'react';
import {
  Designer,
  Workbench,
  ViewPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  OutlineTreeWidget,
  ResourceWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  SettingsPanel,
  HistoryWidget,
  BOWidget,
  ComponentTreeWidget,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import {
  createDesigner,
  Shortcut,
  KeyCode,
  GlobalRegistry,
} from '@designable/core';
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
} from '@designable/formily-semi';
import { EditorProps } from './interface';
import { Icon } from './components/Icon';
import { Color } from './components/Color';
import * as icons from './icon';
import { SchemaEditorWidget } from './widget/SchemaEditorWidget';
import { PreviewWidget } from './widget/PreviewWidget';
import { BoSchemaEditorWidget } from './widget/BoSchemaEditorWidget';
import { MarkupSchemaWidget } from './widget/MarkupSchemaWidget';
import { ActionWidget } from './widget/ActionWidget';
import { useInitializeSchema } from './service/schema';

GlobalRegistry.registerDesignerIcons(icons);

const Editor = (props: EditorProps) => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {},
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel
          actions={
            <ActionWidget
              engine={engine}
              form={props.form}
              onClose={props.onClose}
            />
          }
        >
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
                sources={[
                  Card,
                  FormGrid,
                  FormTab,
                  FormLayout,
                  FormCollapse,
                  Space,
                ]}
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
        </StudioPanel>
      </Workbench>
    </Designer>
  );
};

export default Editor;
