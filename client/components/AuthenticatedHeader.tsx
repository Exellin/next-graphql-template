import { styled } from '@stitches/react';
import { FC } from 'react';

import { UserFieldsFragment, useLogoutMutation } from '../generated/graphql';
import { useToken } from './TokenProvider';

interface Props {
  currentUser: UserFieldsFragment
}

const StyledSpan = styled('span', {
  padding: '0 1rem',
});

const AuthenticatedHeader: FC<Props> = ({ currentUser }: Props) => {
  const [, logout] = useLogoutMutation();
  const { setToken } = useToken();

  return (
    <div>
      <StyledSpan>{`Signed in as ${currentUser.name}`}</StyledSpan>
      <button
        type="button"
        onClick={() => {
          logout();
          setToken('');
        }}
      >
        logout
      </button>
    </div>
  );
};

export default AuthenticatedHeader;
