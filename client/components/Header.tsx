import { FC, useContext } from 'react';
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import TokenContext from '../TokenContext';

interface Props {}

const Header: FC<Props> = () => {
  const [result] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const { setToken } = useContext(TokenContext) as any;

  const { data, fetching } = result;
  let body: any = null;

  if (fetching) {
    body = null;
  } else if (data?.me) {
    body = (
      <div>
        {data.me.name}
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
  } else {
    body = (
      <div>
        <Link href="/register">
          Register
        </Link>
        <Link href="/login">
          Login
        </Link>
      </div>
    );
  }

  return (
    <header>
      <Link href="/">
        Home
      </Link>

      {body}
    </header>
  );
};

export default Header;
