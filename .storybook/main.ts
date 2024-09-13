import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');
    const { resolve } = await import('path');
    return mergeConfig(config, {
      resolve: {
        ...config.resolve,
        alias: [
          { find: /^~/, replacement: '' },
          { find: '@', replacement: resolve(__dirname, '../src') },
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    });
  },
};
export default config;
