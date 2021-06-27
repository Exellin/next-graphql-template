import { FC } from 'react';

import { styled } from '../stitches.config';
import NavLink from './NavLink';

interface Props {}

const StyledUnauthenticatedHeader = styled('ul', {
  listStyle: 'none',
  display: 'flex',
});

const UnauthenticatedHeader: FC<Props> = () => (
  <StyledUnauthenticatedHeader>
    <li>
      <NavLink href="/register">
        Register
      </NavLink>
    </li>

    <li>
      <NavLink href="/login">
        Login
      </NavLink>
    </li>
  </StyledUnauthenticatedHeader>
);

export default UnauthenticatedHeader;
