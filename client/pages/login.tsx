import {
  FC, useEffect, useState, useContext,
} from 'react';
import { useRouter } from 'next/router';

import { useLoginMutation } from '../generated/graphql';
import TokenContext from '../TokenContext';

interface Props {}

const Login: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, login] = useLoginMutation();
  const router = useRouter();
  const { setToken } = useContext(TokenContext) as any;

  useEffect(() => {
    if (loginResult.data?.login) {
      setToken(loginResult.data.login.accessToken);
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
      <input value={email} name="email" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input value={password} name="password" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
