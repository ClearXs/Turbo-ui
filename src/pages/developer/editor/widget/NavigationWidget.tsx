import { Form } from '@/api/developer/form';
import { tryGetIcon } from '@/components/Icon';
import MenuTreeComponent from '@/pages/system/menu/MenuTree';
import { Button, Popover } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

const NavigationWidget: React.FC<{ form: Form }> = ({ form }) => {
  const navigate = useNavigate();
  return (
    <Popover
      content={
        <div className="w-80 h-80 overflow-y-auto">
          <MenuTreeComponent
            multiple={false}
            showDetails={false}
            onChange={(menu) => {
              if (menu && menu.type !== 'BUTTON') {
                navigate(menu.route);
              }
            }}
          />
        </div>
      }
    >
      <Button icon={tryGetIcon('IconApps')} size="large" theme="borderless">
        {form.name}
      </Button>
    </Popover>
  );
};

export default NavigationWidget;
