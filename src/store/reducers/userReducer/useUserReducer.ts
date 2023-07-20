// useUserReducer.tsx
import { useCallback, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  // Add other user properties as needed
}

export const useUserReducer = () => {
  const [user, setUser] = useState<User | null>(null);

  // useCallback to memoize the setUser function
  const memoizedSetUser = useCallback((userData: User | null) => {
    setUser(userData);
  }, []);

  return {
    user,
    setUser: memoizedSetUser,
  };
};
