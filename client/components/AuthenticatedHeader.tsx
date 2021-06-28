import { styled } from '@stitches/react';
import { FC } from 'react';

import { MeQuery, useLogoutMutation } from '../generated/graphql';
import { useToken } from './TokenProvider';

interface Props {
  data: MeQuery
}

const StyledSpan = styled('span', {
  padding: '0 1rem',
});

const AuthenticatedHeader: FC<Props> = ({ data }: Props) => {
  const { me } = data;
  const [, logout] = useLogoutMutation();
  const { setToken } = useToken();

  return (
    <div>
      <StyledSpan>{`Signed in as ${me!.name}`}</StyledSpan>
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
