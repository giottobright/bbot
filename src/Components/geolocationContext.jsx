import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const GeolocationContext = createContext();

const LOCATION_STORAGE_KEY = 'telegram_app_location';
const LOCATION_TIMESTAMP_KEY = 'telegram_app_location_timestamp';
const LOCATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 часа

export const GeolocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getLocation, subscribeToLocation, unsubscribeFromLocation, tg } = useTelegram();
    const locationSubscriptionRef = useRef(null);

    useEffect(() => {
        const initGeolocation = async () => {
            try {
                // Проверяем сохраненную локацию
                const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
                const savedTimestamp = localStorage.getItem(LOCATION_TIMESTAMP_KEY);
                
                if (savedLocation && savedTimestamp) {
                    const locationAge = Date.now() - parseInt(savedTimestamp);
                    if (locationAge < LOCATION_EXPIRY) {
                        setLocation(JSON.parse(savedLocation));
                        setLoading(false);
                    }
                }

                // Запрашиваем новую локацию
                const locationData = await getLocation();
                
                if (locationData) {
                    const newLocation = {
                        lat: locationData.latitude,
                        lng: locationData.longitude,
                        accuracy: locationData.accuracy
                    };
                    
                    setLocation(newLocation);
                    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
                    localStorage.setItem(LOCATION_TIMESTAMP_KEY, Date.now().toString());

                    // Подписываемся на обновления локации
                    if (tg.LocationManager) {
                        locationSubscriptionRef.current = subscribeToLocation((newLocationData) => {
                            const updatedLocation = {
                                lat: newLocationData.latitude,
                                lng: newLocationData.longitude,
                                accuracy: newLocationData.accuracy
                            };
                            setLocation(updatedLocation);
                            localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(updatedLocation));
                            localStorage.setItem(LOCATION_TIMESTAMP_KEY, Date.now().toString());
                        });
                    }
                }
            } catch (err) {
                console.error('Ошибка получения геолокации:', err);
                setError(err.message);
                setLocation({ lat: 55.7558, lng: 37.6173 }); // Москва по умолчанию
            } finally {
                setLoading(false);
            }
        };

        tg.ready();
        initGeolocation();

        // Очистка при размонтировании
        return () => {
            if (locationSubscriptionRef.current) {
                unsubscribeFromLocation(locationSubscriptionRef.current);
            }
        };
    }, [getLocation, subscribeToLocation, unsubscribeFromLocation, tg]);

    const refreshLocation = async () => {
        setLoading(true);
        try {
            const locationData = await getLocation();
            if (locationData) {
                const newLocation = {
                    lat: locationData.latitude,
                    lng: locationData.longitude,
                    accuracy: locationData.accuracy
                };
                setLocation(newLocation);
                localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
                localStorage.setItem(LOCATION_TIMESTAMP_KEY, Date.now().toString());
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GeolocationContext.Provider value={{ 
            location, 
            error, 
            loading,
            refreshLocation,
            accuracy: location?.accuracy
        }}>
            {children}
        </GeolocationContext.Provider>
    );
};

export const useGeolocation = () => useContext(GeolocationContext);