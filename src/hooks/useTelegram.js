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

    const getLocation = async (callback) => {
        try {
            console.log('Начинаем получение геолокации');
            
            if ("geolocation" in navigator) {
                // Опции для геолокации
                const options = {
                    enableHighAccuracy: true, // Высокая точность
                    timeout: 5000,           // Таймаут в мс
                    maximumAge: 0            // Не использовать кэшированную позицию
                };

                // Получаем текущую позицию
                navigator.geolocation.watchPosition(
                    (position) => {
                        console.log('Обновленная локация:', position);
                        callback({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            timestamp: position.timestamp
                        });
                    },
                    (error) => {
                        console.error('Ошибка геолокации:', error);
                        callback(null);
                    },
                    options
                );
            } else {
                throw new Error("Геолокация недоступна в браузере");
            }
        } catch (error) {
            console.error('Ошибка при получении геолокации:', error);
            callback(null);
        }
    }

    return {
        onToggleButton,
        onClose,
        tg,
        user: tg.initData ? JSON.parse(tg.initData).user : null,
        queryId: tg.initDataUnsafe?.query_id,
        getLocation
    }
}