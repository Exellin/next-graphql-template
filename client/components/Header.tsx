import { FC } from 'react';
import Link from 'next/link';

interface Props {}

const Header: FC<Props> = () => (
  <header>
    <Link href="/">
      Home
    </Link>
    <Link href="/register">
      Register
    </Link>
    <Link href="/login">
      Login
    </Link>
  </header>
);

export default Header;
