import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import React from 'react';
import AppRouter from '@/router/router';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  </React.StrictMode>,
);
