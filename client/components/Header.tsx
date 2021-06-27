import { FC } from 'react';

import { useMeQuery } from '../generated/graphql';
import { styled } from '../stitches.config';
import AuthenticatedHeader from './AuthenticatedHeader';
import UnauthenticatedHeader from './UnauthenticatedHeader';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import NavLink from './NavLink';

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
  let body: null | JSX.Element;

  const [result] = useMeQuery();
  const { data, fetching } = result;

  if (fetching) {
    body = null;
  } else if (data?.me) {
    body = <AuthenticatedHeader data={data} />;
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
