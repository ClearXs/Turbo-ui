export type Theme = 'light' | 'dark';

const mql = window.matchMedia('(prefers-color-scheme: dark)');

export const changeTheme = (theme: Theme) => {
  const body = document.body;
  theme && body.setAttribute('theme-mode', theme);
};

mql.addListener((e) => {
  changeTheme(e.matches ? 'dark' : 'light');
});
