import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const { tg } = useTelegram();

  useEffect(() => {
    console.log('Telegram object:', tg);
    console.log('InitData:', tg.initData);
    console.log('InitDataUnsafe:', tg.initDataUnsafe);
    
    // Пробуем получить ID разными способами
    const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user || tg.initDataUnsafe?.user;

    if (tg.initData) {
        try {
          const initData = JSON.parse(tg.initData);
          if (initData.user?.id) {
            const id = initData.user.id.toString();
            console.log('Found user ID from initData:', id);
            setUserId(id);
            return;
          }
        } catch (e) {
          console.error('Error parsing initData:', e);
        }
      }

      if (tg.initDataUnsafe?.user?.id) {
        const id = tg.initDataUnsafe.user.id.toString();
        console.log('Found user ID:', id);
        setUserId(id);
    } else {
        console.log('User ID not found in any source');
    }
    }, [tg]);
    

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 