import Binary from '@/components/Binary';
import TreePanel from '@/components/Tree/TreePanel';
import { BoAttributeHelper, BoTableHelper } from './helper';
import { useState } from 'react';
import { BoAttributeTree } from '@/api/developer/boattribute';
import TableCrud from '@/components/TableCrud';
import _ from 'lodash';
import { Empty } from '@douyinfe/semi-ui';
import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from '@douyinfe/semi-illustrations';

export type BoTableProps = {
  boId?: string;
};

const BoTableComponent: React.FC<BoTableProps> = ({ boId }) => {
  const [parentId, setParentId] = useState<string>();

  return (
    <Binary
      LeftComponent={
        <TreePanel<BoAttributeTree>
          columns={BoTableHelper.getColumns()}
          useApi={BoTableHelper.getApi}
          params={{ boId, attrType: 'table' }}
          first={true}
          onSelectChange={setParentId}
          depth={0}
          root="业务对象"
          expandAll
          toolbar={{ showAdd: false }}
          addDefaultValue={{ boId, attrType: 'table' }}
        />
      }
      RightComponent={
        _.isEmpty(parentId) ? (
          <Empty
            image={<IllustrationNoContent />}
            darkModeImage={<IllustrationNoContentDark />}
            description={'暂无内容，请添加！'}
          />
        ) : (
          <TableCrud<BoAttributeTree>
            mode="page"
            columns={BoAttributeHelper.getColumns()}
            useApi={BoTableHelper.getApi}
            params={{ boId, parentId, attrType: 'field' }}
          />
        )
      }
    />
  );
};

export default BoTableComponent;
