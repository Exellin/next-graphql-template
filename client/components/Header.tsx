import { FC } from 'react';

import { styled } from '../stitches.config';
import AuthenticatedHeader from './AuthenticatedHeader';
import UnauthenticatedHeader from './UnauthenticatedHeader';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import NavLink from './NavLink';
import { useCurrentUser } from './CurrentUserProvider';

const StyledHeader = styled('header', {
  backgroundColor: '$primaryBg',
  color: '$primary',
});

const StyledNav = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface Props {}

const Header: FC<Props> = () => {
  let body: JSX.Element;

  const { currentUser } = useCurrentUser();

  if (currentUser) {
    body = <AuthenticatedHeader currentUser={currentUser} />;
  } else {
    body = <UnauthenticatedHeader />;
  }

  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <NavLink href="/">
            Home
          </NavLink>
          <ThemeToggle />
          {body}
        </StyledNav>
      </Container>
    </StyledHeader>
  );
};

export default Header;
