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
            
            // Проверяем, инициализирован ли геолокационный менеджер
            if (!tg.geolocationManager.isInited) {
                await tg.geolocationManager.init();
            }

            // Проверяем доступность геолокации
            if (!tg.geolocationManager.isLocationAvailable) {
                throw new Error("Геолокация недоступна на устройстве");
            }

            // Если разрешение еще не получено, запрашиваем его
            if (!tg.geolocationManager.isAccessGranted) {
                const granted = await tg.geolocationManager.requestPermission();
                if (!granted) {
                    throw new Error("Доступ к геолокации не предоставлен");
                }
            }

            // Получаем геолокацию через Telegram API
            tg.geolocationManager.getLocation((location) => {
                if (location) {
                    callback({
                        latitude: location.latitude,
                        longitude: location.longitude
                    });
                } else {
                    callback(null);
                }
            });

        } catch (error) {
            console.error('Ошибка при получении геолокации:', error);
            callback(null);
        }
    }

    return {
        onToggleButton,
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        getLocation
    }
}