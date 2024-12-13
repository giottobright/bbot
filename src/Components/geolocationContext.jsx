import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locationManager, initLocationManager } = useTelegram();

  useEffect(() => {
    const setupLocation = async () => {
      try {
        // Инициализация LocationManager
        await initLocationManager(() => {
          if (!locationManager.isLocationAvailable) {
            throw new Error("Геолокация недоступна на устройстве");
          }

          if (!locationManager.isAccessGranted) {
            locationManager.openSettings();
          }

          locationManager.getLocation((locationData) => {
            if (locationData) {
              setLocation({
                lat: locationData.latitude,
                lng: locationData.longitude
              });
            } else {
              throw new Error("Не удалось получить геолокацию");
            }
            setLoading(false);
          });
        });
      } catch (e) {
        console.error("Ошибка получения геолокации:", e);
        setError(e.message);
        setLocation({ lat: 55.7558, lng: 37.6173 }); // Москва по умолчанию
        setLoading(false);
      }
    };

    setupLocation();
  }, [locationManager, initLocationManager]);

  return (
    <GeolocationContext.Provider value={{ location, error, loading }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => useContext(GeolocationContext);