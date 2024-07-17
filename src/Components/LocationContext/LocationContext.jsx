import React, { createContext, useState, useEffect, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationRequested, setIsLocationRequested] = useState(false);

  const requestLocation = () => {
    if (!isLocationRequested && "geolocation" in navigator) {
      setIsLocationRequested(true);
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
    } else if (!("geolocation" in navigator)) {
      console.log("Геолокация не поддерживается браузером");
      setUserLocation({ lat: 55.7558, lng: 37.6173 }); // Дефолтная локация (Москва)
    }
  };

  return (
    <LocationContext.Provider value={{ userLocation, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);