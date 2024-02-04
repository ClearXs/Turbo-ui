import usePageApi from '@/api/developer/page';
import { Toast } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataView } from '../editor/kernel';
import TreePanel from '@/components/Tree/TreePanel';
import TableCrud from '@/components/TableCrud';
import _ from 'lodash';
import Binary from '@/components/Binary';

const Domain = () => {
  const page = usePageApi();
  const location = useLocation();
  const [dataView, setDataView] = useState<DataView>();

  useEffect(() => {
    const { pathname } = location;
    const pageId = pathname.substring(pathname.lastIndexOf('/') + 1);
    page
      .dataView(pageId)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          setDataView(data);
        } else {
          Toast.error(message);
        }
      })
      .catch((err) => {
        Toast.error(err);
      });
  }, [location.pathname]);

  if (!dataView) {
    return;
  }

  const Table = <TableCrud {..._.omit(dataView, 'leftTree')} />;
  const Tree = dataView.leftTree && (
    <TreePanel {...dataView.leftTree}></TreePanel>
  );

  if (dataView.leftTree) {
    return <Binary LeftComponent={Tree} RightComponent={Table} />;
  }

  return Table;
};

export default Domain;
