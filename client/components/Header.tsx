import { FC } from 'react';
import Link from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface Props {}

const Header: FC<Props> = () => {
  const [result] = useMeQuery();

  const { data, fetching } = result;
  let body: any = null;

  if (fetching) {
    body = null;
  } else if (data?.me) {
    body = <div>{data.me.name}</div>;
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
