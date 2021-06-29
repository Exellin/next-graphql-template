import {
  FC, ReactChild, createContext, useContext,
} from 'react';

import { useMeQuery, UserFieldsFragment } from '../generated/graphql';

type ContextValue = { currentUser: UserFieldsFragment | null | undefined };

const CurrentUserContext = createContext<ContextValue | undefined>(undefined);

interface Props {
  children: ReactChild | ReactChild[]
}

const CurrentUserProvider: FC<Props> = ({ children }: Props) => {
  const [result] = useMeQuery();
  const { data } = result;

  const value = {
    currentUser: data?.me,
  };

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }

  return context;
};

export { CurrentUserProvider, useCurrentUser };
