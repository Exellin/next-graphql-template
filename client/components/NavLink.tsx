import { FC, ReactChild } from 'react';
import Link from 'next/link';
import { styled } from '../stitches.config';

interface Props {
  children: ReactChild | ReactChild[],
  href: string
}

const StyledLink = styled('a', {
  padding: '1rem',
  '&:hover': {
    backgroundColor: '$accent',
  },
});

const NavLink: FC<Props> = ({ href, children }: Props) => (
  <Link href={href} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
);

export default NavLink;
