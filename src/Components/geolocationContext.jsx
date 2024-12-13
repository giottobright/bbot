import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const GeolocationContext = createContext();

const LOCATION_STORAGE_KEY = 'telegram_app_location';
const LOCATION_TIMESTAMP_KEY = 'telegram_app_location_timestamp';
const LOCATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const GeolocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { tg } = useTelegram();

    useEffect(() => {
        const initGeolocation = async () => {
            try {
                // Check if we have cached location
                const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
                const savedTimestamp = localStorage.getItem(LOCATION_TIMESTAMP_KEY);
                
                if (savedLocation && savedTimestamp) {
                    const locationAge = Date.now() - parseInt(savedTimestamp);
                    if (locationAge < LOCATION_EXPIRY) {
                        setLocation(JSON.parse(savedLocation));
                        setLoading(false);
                        return; // Use cached location if valid
                    }
                }

                // Initialize LocationManager
                if (tg.LocationManager && !tg.LocationManager.isInited) {
                    await new Promise((resolve) => {
                        tg.LocationManager.init(() => resolve());
                    });
                }

                // Request location access if not granted
                if (tg.LocationManager && !tg.LocationManager.isAccessGranted) {
                    // Try to get location which will trigger permission request
                    await new Promise((resolve) => {
                        tg.LocationManager.getLocation((locationData) => {
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
                            resolve();
                        });
                    });
                }

                // If location access was denied, open settings
                if (tg.LocationManager && !tg.LocationManager.isAccessGranted) {
                    tg.LocationManager.openSettings();
                    throw new Error('Location access denied');
                }

            } catch (err) {
                console.error('Geolocation error:', err);
                setError(err.message);
                setLocation({ lat: 55.7558, lng: 37.6173 }); // Default to Moscow
            } finally {
                setLoading(false);
            }
        };

        tg.ready();
        initGeolocation();
    }, [tg]);

    const refreshLocation = async () => {
        if (!tg.LocationManager || !tg.LocationManager.isAccessGranted) {
            return;
        }

        setLoading(true);
        try {
            await new Promise((resolve) => {
                tg.LocationManager.getLocation((locationData) => {
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
                    resolve();
                });
            });
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
            accuracy: location?.accuracy,
            isLocationAvailable: tg.LocationManager?.isLocationAvailable,
            isAccessGranted: tg.LocationManager?.isAccessGranted
        }}>
            {children}
        </GeolocationContext.Provider>
    );
};

export const useGeolocation = () => useContext(GeolocationContext);