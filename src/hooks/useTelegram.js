const tg = window.Telegram.WebApp;

const urlParams = new URLSearchParams(window.location.search);
const webAppData = urlParams.get('tgWebAppData');

if (webAppData) {
    try {
        const parsedData = JSON.parse(decodeURIComponent(webAppData));
        console.log('Parsed WebApp data:', parsedData);
        tg.initData = webAppData;
        tg.initDataUnsafe = parsedData;
    } catch (e) {
        console.error('Error parsing tgWebAppData from URL:', e);
    }
}

export function useTelegram() {
    const getUserData = () => {
        if (tg.initDataUnsafe?.user) {
            return tg.initDataUnsafe.user;
        }
        return null;
    };

    const onClose = () => {
        tg.close();
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
                const options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

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
        onClose,
        onToggleButton,
        tg,
        user: getUserData(),
        queryId: tg.initDataUnsafe?.query_id,
        getLocation
    }
}