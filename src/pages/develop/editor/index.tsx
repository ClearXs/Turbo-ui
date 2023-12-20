import React, { useEffect, useMemo } from "react";
import "antd/dist/antd.less";
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
} from "@designable/react";
import { SettingsForm } from "@designable/react-settings-form";
import { observer } from "@formily/react";
import {
  createDesigner,
  createBehavior,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from "@designable/core";
import {
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
} from "@designable/formily-semi";
import { Content } from "./Content";
import { SemiPreviewWidget } from "./SemiPreviewWidget";
import { SemiSchemaEditorWidget } from "./SemiSchemaEditorWidget";
import {
  Button,
  Space as SemiSpace,
  Radio as SemiRadio,
} from "@douyinfe/semi-ui";
//import { Sandbox } from '@designable/react-sandbox'

GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: {
      Inputs: "输入控件",
      Displays: "展示控件",
      Feedbacks: "反馈控件",
    },
  },
  "en-US": {
    sources: {
      Inputs: "Inputs",
      Displays: "Displays",
      Feedbacks: "Feedbacks",
    },
  },
  "ko-KR": {
    sources: {
      Inputs: "입력",
      Displays: "디스플레이",
      Feedbacks: "피드백",
    },
  },
});


const Actions = observer(() => {
  const supportLocales = ["zh-cn", "en-us", "ko-kr"];
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage("zh-cn");
    }
  }, []);

  return (
    <SemiSpace style={{ marginRight: 10 }}>
      <SemiRadio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        options={[
          { label: "English", value: "en-us" },
          { label: "简体中文", value: "zh-cn" },
          { label: "한국어", value: "ko-kr" },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value);
        }}
      />
      <Button>保存</Button>
      <Button type="primary">发布</Button>
    </SemiSpace>
  );
});

const SemiEditor = () => {
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
        rootComponentName: "Form",
      }),
    []
  );

  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel  actions={<Actions />}>
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
                  DatePicker,
                  TimePicker,
                  Upload,
                  Switch,
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
          </CompositePanel>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={["DESIGNABLE", "JSONTREE", "PREVIEW"]} />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel>
              <ViewPanel type="JSONTREE">
                {(tree) => {
                  return <SemiSchemaEditorWidget tree={tree} />;
                }}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => {
                  return <SemiPreviewWidget tree={tree} />;
                }}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  );
};

export default SemiEditor;
