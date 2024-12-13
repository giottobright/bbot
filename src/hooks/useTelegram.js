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
            
            // Проверяем сохраненное разрешение
            const locationPermission = localStorage.getItem('locationPermission');
            
            if (!locationPermission) {
                // Если разрешения нет, запрашиваем его
                const permission = await new Promise((resolve) => {
                    navigator.geolocation.getCurrentPosition(
                        () => {
                            localStorage.setItem('locationPermission', 'granted');
                            resolve(true);
                        },
                        () => resolve(false)
                    );
                });
                
                if (!permission) {
                    throw new Error("Доступ к геолокации не предоставлен");
                }
            }

            // Получаем геолокацию
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Полученная локация:', position);
                        callback({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Ошибка геолокации:', error);
                        localStorage.removeItem('locationPermission'); // Удаляем разрешение при ошибке
                        callback(null);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                throw new Error("Геолокация недоступна в браузере");
            }
        } catch (error) {
            console.error('Ошибка при получении геолокации:', error);
            localStorage.removeItem('locationPermission'); // Удаляем разрешение при ошибке
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