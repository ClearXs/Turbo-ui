import { directGetIcon } from '@/components/Icon';
import { Button, Form, Space, Table } from '@douyinfe/semi-ui';

const Menu = () => {
  return (
    <>
      <header>
        <Form labelPosition="left" className="flex">
          <Form.Input label="菜单名称" field="menuName"></Form.Input>
          <Space className="ml-auto">
            <Button
              type="primary"
              icon={directGetIcon('IconSearch')}
              size="large"
            >
              搜索
            </Button>
            <Button
              type="tertiary"
              icon={directGetIcon('IconRefresh')}
              size="large"
            >
              重制
            </Button>
          </Space>
        </Form>
        <Space>
          <Button
            type="primary"
            icon={directGetIcon('IconSearch')}
            size="large"
          >
            新增
          </Button>
          <Button
            type="tertiary"
            icon={directGetIcon('IconRefresh')}
            size="large"
          >
            编辑
          </Button>
        </Space>
      </header>
      <Table pagination={false}></Table>
    </>
  );
};

export default Menu;
