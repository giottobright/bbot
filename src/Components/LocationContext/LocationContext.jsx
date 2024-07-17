import React, { createContext, useState, useEffect, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
          setUserLocation({ lat: 55.7558, lng: 37.6173 }); // Дефолтная локация (Москва)
        }
      );
    } else {
      console.log("Геолокация не поддерживается браузером");
      setUserLocation({ lat: 55.7558, lng: 37.6173 }); // Дефолтная локация (Москва)
    }
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);