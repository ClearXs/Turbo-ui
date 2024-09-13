import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import 'tailwindcss/tailwind.css';
import '../src/styles/index.scss';
import React from 'react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'white',
          value: '#fffff',
        },
        {
          name: 'semi',
          value: '#1d59f2',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      );
    },
  ],
};

export default preview;
