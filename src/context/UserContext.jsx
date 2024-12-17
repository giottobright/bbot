import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const { tg } = useTelegram();

  useEffect(() => {
    console.log('Telegram object:', tg);
    console.log('InitData:', window.Telegram.WebApp.initData);
    console.log('InitDataUnsafe:', window.Telegram.WebApp.initDataUnsafe);
    
    // Пробуем получить ID разными способами
    const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || tg.initDataUnsafe?.user;
    
    if (telegramUser?.id) {
      const id = telegramUser.id.toString();
      console.log('Found user ID:', id);
      setUserId(id);
    } else {
      console.log('User ID not found in any source');
    }
  }, [tg.initDataUnsafe]);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 