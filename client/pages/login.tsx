import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useLoginMutation } from '../generated/graphql';

interface Props {}

const Login: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, login] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (loginResult.data && !loginResult.error) {
      router.push('/');
    }
  }, [loginResult]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      login({
        input: {
          email, password,
        },
      });
    }}
    >
      <input value={email} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input value={password} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
