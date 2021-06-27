import { styled } from '@stitches/react';
import { FC, useContext } from 'react';

import { MeQuery, useLogoutMutation } from '../generated/graphql';
import TokenContext from '../TokenContext';

interface Props {
  data: MeQuery
}

const StyledSpan = styled('span', {
  padding: '0 1rem',
});

const AuthenticatedHeader: FC<Props> = ({ data }: Props) => {
  const { me } = data;
  const [, logout] = useLogoutMutation();
  const { setToken } = useContext(TokenContext) as any;

  return (
    <div>
      <StyledSpan>{`Signed in as ${me!.name}`}</StyledSpan>
      <button
        type="button"
        onClick={() => {
          logout();
          setToken(null);
        }}
      >
        logout
      </button>
    </div>
  );
};

export default AuthenticatedHeader;
