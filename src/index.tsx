import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { AppRouter } from '@/route';
import './styles/index.scss';
import stores from '@/stores';

import { Provider } from 'mobx-react';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <Provider {...stores}>
    <AppRouter />
  </Provider>,
);
