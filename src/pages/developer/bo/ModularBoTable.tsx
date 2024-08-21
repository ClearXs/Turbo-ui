import Binary from '@/components/binary';
import TreePanel from '@/components/tree/TreePanel';
import { BoAttributeHelper, BoTableHelper } from './helper';
import { useEffect, useMemo } from 'react';
import { BoAttributeTree } from '@/api/developer/boattribute';
import TableCrud from '@/components/table-crud';
import _ from 'lodash';
import { Empty, Toast } from '@douyinfe/semi-ui';
import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from '@douyinfe/semi-illustrations';
import { observable } from '@formily/reactive';
import { observer } from '@formily/react';
import Modular from '@/components/modular/Modular';
import useBoApi from '@/api/developer/bo';

export type ModularBoTableProps = {
  boId: string;
  visible: boolean;
  onCancel: () => void;
};

type BoTableInternalProps = {
  boTableId?: string;
  changed: boolean;
  changedDetails: BoAttributeTree[];
};

const ModularBoTable: React.FC<ModularBoTableProps> = observer(
  ({ boId, visible, onCancel }) => {
    const boApi = useBoApi();
    const props: BoTableInternalProps = useMemo(() => {
      return observable({
        boTableId: undefined,
        changed: false,
        changedDetails: [],
      });
    }, []);

    useEffect(() => {
      return () => {
        props.boTableId = undefined;
        props.changed = false;
        props.changedDetails = [];
      };
    }, []);

    return (
      <Modular
        fullScreen
        visible={visible}
        closeOnEsc={false}
        beforeCancel={(thenCancel) => {
          if (props.changed) {
            Modular.warning({
              title: '检测到业务对象有变化!',
              content: '是否需要进行物化?',
              onCancel() {
                thenCancel?.();
              },
              onConfirm() {
                return boApi.materialize(boId).then((res) => {
                  const { code, data } = res;
                  if (code === 200 && data) {
                    Toast.success('物化成功');
                  } else {
                    Toast.error(res.message);
                  }
                  thenCancel?.();
                });
              },
            });
          } else {
            thenCancel?.();
          }
        }}
        onCancel={onCancel}
        showCancel={false}
        showConfirm={false}
        scrollY={false}
      >
        <Binary
          LeftComponent={
            <TreePanel<BoAttributeTree>
              columns={BoTableHelper.getColumns()}
              useApi={BoTableHelper.getApi}
              params={{ boId, attrType: 'table' }}
              first={true}
              onSelectChange={(boTableId) => (props.boTableId = boTableId)}
              expandAll
              root={{ name: '业务对象' }}
              operateBar={{
                showAdd(record, treePanelContext) {
                  return treePanelContext.dataSource.length < 1;
                },
                showSubordinate: true,
              }}
              addDefaultValue={{ boId, attrType: 'table' }}
            />
          }
          RightComponent={
            props.boTableId ? (
              <TableCrud<BoAttributeTree>
                mode="list"
                columns={BoAttributeHelper.getColumns()}
                useApi={BoTableHelper.getApi}
                event={{
                  onSaveOrUpdateSuccess(entity) {
                    props.changed = true;
                    props.changedDetails.push(entity);
                  },
                }}
                params={{ boId, parentId: props.boTableId, attrType: 'field' }}
              />
            ) : (
              <Empty
                image={<IllustrationNoContent />}
                darkModeImage={<IllustrationNoContentDark />}
                description={'暂无内容，请添加！'}
              />
            )
          }
        />
      </Modular>
    );
  },
);

export default ModularBoTable;
