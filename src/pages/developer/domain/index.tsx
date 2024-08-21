import usePageApi, { PageView } from '@/api/developer/page';
import { Toast } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TreePanel from '@/components/tree/TreePanel';
import TableCrud from '@/components/table-crud';
import _ from 'lodash';
import Binary from '@/components/binary';
import useDomainApi, { DomainEntity } from '@/api/developer/domain';

const Domain = () => {
  const page = usePageApi();
  const location = useLocation();
  const [pageView, setPageView] = useState<PageView>();
  const domainApi = useDomainApi(pageView?.boId);

  useEffect(() => {
    const { pathname } = location;
    const pageId = pathname.substring(pathname.lastIndexOf('/') + 1);
    page
      .pageView(pageId)
      .then((res) => {
        const { code, data, message } = res;
        if (code === 200) {
          setPageView(data);
        } else {
          Toast.error(message);
        }
      })
      .catch((err) => {
        Toast.error(err);
      });
  }, [location.pathname]);

  if (!pageView?.dataView) {
    return;
  }

  const { dataView } = pageView;
  const Table = (
    <TableCrud<DomainEntity>
      {..._.omit(dataView, 'leftTree')}
      useApi={domainApi}
    />
  );
  const Tree = dataView.leftTree && (
    <TreePanel {...dataView.leftTree}></TreePanel>
  );

  if (dataView.leftTree) {
    return <Binary LeftComponent={Tree} RightComponent={Table} />;
  }

  return Table;
};

export default Domain;
