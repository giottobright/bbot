import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getLocation } = useTelegram();

  useEffect(() => {
    let watchId;

    const startLocationWatch = async () => {
      try {
        watchId = await getLocation((locationData) => {
          if (locationData) {
            // Проверяем, изменилась ли локация существенно
            const locationChanged = !location || 
              Math.abs(location.lat - locationData.latitude) > 0.0001 || 
              Math.abs(location.lng - locationData.longitude) > 0.0001;

            if (locationChanged) {
              setLocation({
                lat: locationData.latitude,
                lng: locationData.longitude,
                accuracy: locationData.accuracy,
                timestamp: locationData.timestamp
              });
              console.log('Локация обновлена:', locationData);
            }
          } else {
            setError("Не удалось получить геолокацию");
            setLocation({ lat: 55.7558, lng: 37.6173 }); // Москва по умолчанию
          }
          setLoading(false);
        });
      } catch (err) {
        console.error('Ошибка при отслеживании геолокации:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    startLocationWatch();

    // Очистка при размонтировании
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [getLocation]);

  return (
    <GeolocationContext.Provider value={{ 
      location, 
      error, 
      loading,
      lastUpdated: location?.timestamp 
    }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => useContext(GeolocationContext);