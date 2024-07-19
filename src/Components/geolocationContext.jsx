import React, { createContext, useState, useEffect, useContext } from 'react';

const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
          setError(error.message);
          setLocation({ lat: 55.7558, lng: 37.6173 }); // Default to Moscow
          setLoading(false);
        }
      );
    } else {
      setError("Геолокация не поддерживается браузером");
      setLocation({ lat: 55.7558, lng: 37.6173 }); // Default to Moscow
      setLoading(false);
    }
  }, []);

  return (
    <GeolocationContext.Provider value={{ location, error, loading }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => useContext(GeolocationContext);