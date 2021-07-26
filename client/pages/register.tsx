import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useCreateUserMutation } from '../generated/graphql';

interface Props {}

const Register: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserResult, createUser] = useCreateUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (createUserResult.data && !createUserResult.error) {
      router.push('/');
    }
  }, [createUserResult, router]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createUser({
        input: {
          email, password,
        },
      });
    }}
    >
      <input value={email} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input value={password} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">register</button>
    </form>
  );
};

export default Register;
