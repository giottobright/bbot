import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getLocation } = useTelegram();

  useEffect(() => {
    getLocation((locationData) => {
      if (locationData) {
        setLocation({
          lat: locationData.latitude,
          lng: locationData.longitude
        });
      } else {
        setError("Не удалось получить геолокацию");
        setLocation({ lat: 55.7558, lng: 37.6173 }); // Москва по умолчанию
      }
      setLoading(false);
    });
  }, [getLocation]);

  return (
    <GeolocationContext.Provider value={{ location, error, loading }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => useContext(GeolocationContext);