import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users/4')
      .then((res) => res.json())
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

