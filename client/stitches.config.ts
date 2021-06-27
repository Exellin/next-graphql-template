import { createCss } from '@stitches/react';

const { styled, theme } = createCss({
  theme: {
    colors: {
      primary: 'black',
      primaryBg: 'lightgray',
      accent: 'lightblue',
    },
  },
  media: { // sampled from https://getbootstrap.com/docs/5.0/layout/breakpoints/
    sm: '(max-width: 767px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1200px)',
  },
});

const darkTheme = theme({
  colors: {
    primary: 'white',
    primaryBg: 'black',
    accent: 'darkblue',
  },
});

export { styled, darkTheme };
