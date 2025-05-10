import useAuthApi from '@/api/system/auth';
import { Role } from '@/api/system/role';
import { Card, CardGroup } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const MyRole = () => {
  const authApi = useAuthApi();
  const [roles, setRoles] = useState<Role[]>([]);
  useEffect(() => {
    authApi.currentUserRole().then((res) => {
      const { code, data } = res;
      if (code === 200) {
        setRoles(data);
      }
    });
  }, []);

  return (
    <>
      <CardGroup spacing={50} className="p-5">
        {roles.map((role) => {
          return (
            <Card
              key={role.id}
              shadows="hover"
              title={role.name}
              headerLine={false}
              className="w-56"
            >
              <Text>{role.des}</Text>
            </Card>
          );
        })}
      </CardGroup>
    </>
  );
};

export default observer(MyRole);
