import { styled } from '@stitches/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <div>
      <StyledSpan>{`Signed in as ${currentUser.email}`}</StyledSpan>
      <button
        type="button"
        name="logout"
        onClick={() => {
          logout();
          setToken('');
          router.push('/login');
        }}
      >
        logout
      </button>
    </div>
  );
};

export default AuthenticatedHeader;
