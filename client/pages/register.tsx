import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useCreateUserMutation } from '../generated/graphql';

interface Props {}

const register: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [createUserResult, createUser] = useCreateUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (createUserResult.data && !createUserResult.error) {
      router.push('/');
    }
  }, [createUserResult]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createUser({
        input: {
          email, firstName, lastName, password,
        },
      });
    }}
    >
      <input value={email} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input value={firstName} type="text" placeholder="first name" onChange={(e) => setfirstName(e.target.value)} />
      <input value={lastName} type="text" placeholder="last name" onChange={(e) => setlastName(e.target.value)} />
      <input value={password} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">register</button>
    </form>
  );
};

export default register;
