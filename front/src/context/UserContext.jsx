import { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '@/services/userService';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(4)
      .then((data) => setUser(data))
      .catch((err) => console.error('Chyba při načítání uživatele:', err));
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

