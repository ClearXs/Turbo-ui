import { useMemo } from 'react';
import { Designer, Workbench, StudioPanel } from '@designable/react';
import {
  createDesigner,
  Shortcut,
  KeyCode,
  GlobalRegistry,
} from '@designable/core';
import { EditorProps, ViewType } from './interface';
import * as icons from './icon';
import { ActionWidget } from './widget/ActionWidget';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import FormDesignPanel from './panel/FormDesignPanel';
import ViewWidget from './widget/ViewWidget';
import LoadingPanel from './panel/LoadingPanel';
import DataViewPanel from './panel/DataViewPanel';
import PageSettingPanel from './panel/PageSettingPanel';
import DataManagerPanel from './panel/DataManagerPanel';
import { createKernel } from './kernel';
import { KernelContext } from './context';
import NavigationWidget from './widget/NavigationWidget';

GlobalRegistry.registerDesignerIcons(icons);

export type DesignableProps = {
  // 页面初始化Loading
  loading: boolean;
  // 保存时Loading
  saveLoading: boolean;
  selectPanel: ViewType;
};

export type DesignableEditorProps = {
  props: EditorProps;
  designableProps: DesignableProps;
};

const Editor = (props: EditorProps) => {
  const designableProps: DesignableProps = useMemo(() => {
    return observable({
      loading: true,
      saveLoading: false,
      selectPanel:
        (props.panels && props.panels.length > 0 && props.panels[0]) ||
        'formDesign',
    });
  }, []);

  return <DesignableEditor designableProps={designableProps} props={props} />;
};

const DesignableEditor: React.FC<DesignableEditorProps> = observer(
  ({ designableProps, props }) => {
    const PanelCollect: Record<ViewType, any> = useMemo(() => {
      return {
        formDesign: FormDesignPanel,
        dataView: DataViewPanel,
        pageSetting: PageSettingPanel,
        dataManager: DataManagerPanel,
      };
    }, []);

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

    const kernel = useMemo(() => createKernel(engine), []);
    const Panel = PanelCollect[designableProps.selectPanel];

    return (
      <KernelContext.Provider value={kernel}>
        <Designer engine={engine}>
          <Workbench>
            <LoadingPanel designableProps={designableProps} form={props.form}>
              <StudioPanel
                logo={<NavigationWidget form={props.form} />}
                body={
                  <ViewWidget
                    editorProps={props}
                    designableProps={designableProps}
                  />
                }
                actions={
                  <ActionWidget
                    designableProps={designableProps}
                    onSave={props.onSave}
                    onPublish={props.onPublish}
                    onClose={props.onClose}
                  />
                }
              >
                {Panel && <Panel />}
              </StudioPanel>
            </LoadingPanel>
          </Workbench>
        </Designer>
      </KernelContext.Provider>
    );
  },
);

export default Editor;
