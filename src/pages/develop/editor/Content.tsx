import { ComponentTreeWidget } from "@designable/react";
import "antd/dist/antd.css";
import {
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
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from "@designable/formily-semi";

export const Content = () => (
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
    }}
  />
);
