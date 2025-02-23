import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { AppRouter } from '@/route';
import './styles/index.scss';
import stores from '@/stores';

import { Provider } from 'mobx-react';
import { configure } from 'mobx';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

configure({ enforceActions: 'never' });

root.render(
  <Provider {...stores}>
    <AppRouter />
  </Provider>,
);
