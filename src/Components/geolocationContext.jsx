import React, { createContext, useContext } from 'react';
import { useThrottledGeolocation } from '../hooks/useThrottledGeolocation';

const GeolocationContext = createContext();

export function GeolocationProvider({ children }) {
  const geolocation = useThrottledGeolocation(30000); // обновление каждые 30 секунд

  return (
    <GeolocationContext.Provider value={geolocation}>
      {children}
    </GeolocationContext.Provider>
  );
}

export function useGeolocation() {
  return useContext(GeolocationContext);
}