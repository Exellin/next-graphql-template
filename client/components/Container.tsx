import {
  FC, ReactChild,
} from 'react';

import { styled } from '../stitches.config';

const StyledContainer = styled('div', {
  margin: '0 auto',

  '@sm': {
    padding: '0 0.5rem',
  },
  '@md': {
    padding: '0 1rem',
  },
  '@lg': {
    padding: '0 2rem',
  },
});

interface Props {
  children: ReactChild | ReactChild[]
}

const Container: FC<Props> = ({ children }: Props) => (
  <StyledContainer>
    {children}
  </StyledContainer>
);

export default Container;
