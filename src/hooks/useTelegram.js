const tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    const getLocation = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // Проверяем поддержку LocationManager
                if (tg.LocationManager) {
                    try {
                        // Запрашиваем геолокацию через LocationManager
                        const location = await tg.LocationManager.getLocation({
                            timeout: 5000 // таймаут 5 секунд
                        });
                        
                        console.log('Получена локация через LocationManager:', location);
                        return resolve(location);
                    } catch (error) {
                        if (error.type === 'location_unavailable') {
                            console.log('LocationManager недоступен, пробуем браузерную геолокацию');
                        } else {
                            console.error('Ошибка LocationManager:', error);
                        }
                    }
                }

                // Fallback на браузерную геолокацию
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            console.log('Получена браузерная геолокация:', position);
                            resolve({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                accuracy: position.coords.accuracy,
                                live_period: 0 // для совместимости с форматом LocationManager
                            });
                        },
                        (error) => {
                            console.error('Ошибка браузерной геолокации:', error);
                            reject(error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0
                        }
                    );
                } else {
                    reject(new Error("Геолокация недоступна"));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    // Подписка на обновления геолокации
    const subscribeToLocation = (callback) => {
        if (tg.LocationManager) {
            return tg.LocationManager.subscribe(callback);
        }
        return null;
    }

    // Отписка от обновлений геолокации
    const unsubscribeFromLocation = (subscriptionId) => {
        if (tg.LocationManager && subscriptionId) {
            tg.LocationManager.unsubscribe(subscriptionId);
        }
    }

    return {
        onToggleButton,
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        getLocation,
        subscribeToLocation,
        unsubscribeFromLocation
    }
}