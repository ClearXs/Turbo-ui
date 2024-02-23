import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { AppRouter } from '@/route';
import { RecoilEnv, RecoilRoot } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = true;

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>,
);
