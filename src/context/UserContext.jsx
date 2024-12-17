import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const { user } = useTelegram();

    useEffect(() => {
        console.log('Telegram user data:', user);
        if (user?.id) {
            setUserId(user.id.toString());
            console.log('Set user ID:', user.id.toString());
        }
    }, [user]);

    const value = {
        userId,
        isAuthenticated: !!userId
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 