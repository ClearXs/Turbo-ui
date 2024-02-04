import { directGetIcon } from '@/components/Icon';
import { Button, Layout, Typography } from '@douyinfe/semi-ui';

export default function Copyright() {
  return (
    <Layout.Footer className="absolute bottom-5 w-[100vw] text-center">
      <Typography.Text type="tertiary">
        Copyright @ 2023-2024 ClearX All rights reserved Simple · Practical ·
        Leading Edge · Innovation
      </Typography.Text>
      <Button
        icon={directGetIcon('IconGithubLogo')}
        theme="borderless"
        onClick={() => window.open('https://github.com/ClearXs/Turbo')}
      />
    </Layout.Footer>
  );
}
