import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const { tg } = useTelegram();

  useEffect(() => {
    console.log('Telegram init data:', tg.initDataUnsafe);
    if (tg.initDataUnsafe?.user?.id) {
      const id = tg.initDataUnsafe.user.id.toString();
      console.log('User ID from Telegram:', id);
      setUserId(id);
    }
  }, [tg.initDataUnsafe]);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 