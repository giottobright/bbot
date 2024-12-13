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
            
            // Инициализируем LocationManager
            await tg.locationManager.init();
            console.log('LocationManager инициализирован');
            
            // Проверяем доступность
            console.log('Доступность геолокации:', tg.locationManager.isLocationAvailable);
            if (!tg.locationManager.isLocationAvailable) {
                throw new Error("Геолокация недоступна");
            }

            // Проверяем статус разрешения
            console.log('Статус разрешения:', tg.locationManager.isAccessGranted);
            if (!tg.locationManager.isAccessGranted) {
                const permissionGranted = await tg.locationManager.requestPermission();
                console.log('Результат запроса разрешения:', permissionGranted);
                if (!permissionGranted) {
                    throw new Error("Доступ к геолокации не предоставлен");
                }
            }

            // Получаем локацию
            tg.locationManager.getLocation((location) => {
                console.log('Полученная локация:', location);
                callback(location);
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