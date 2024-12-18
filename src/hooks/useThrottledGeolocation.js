import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export function useThrottledGeolocation(delay = 30000) {
  const [location, setLocation] = useState({
    lat: 55.751244, // Москва по умолчанию
    lng: 37.618423
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const throttledSetLocation = throttle((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLoading(false);
    }, delay);

    const handleError = (error) => {
      setError(error.message);
      setLoading(false);
    };

    const watchId = navigator.geolocation.watchPosition(
      throttledSetLocation,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: delay
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      throttledSetLocation.cancel();
    };
  }, [delay]);

  return { location, loading, error };
} 