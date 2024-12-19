import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Box } from '@mui/material';
import { useGeolocation } from '../geolocationContext';
import { bars } from '../data';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './BeerMap.css';

function BeerMap() {
  const location = useLocation();
  const navigate = useNavigate();
  const { beer } = location.state;
  const { location: userLocation } = useGeolocation();
  const [availableBars, setAvailableBars] = useState([]);

  useEffect(() => {
    if (userLocation) {
      const barsWithBeer = bars.filter(bar => 
        bar.beers.some(b => b.id === beer.id)
      );
      setAvailableBars(barsWithBeer);
    }
  }, [userLocation, beer.id]);

  return (
    <div className="beer-map-container">
      <Box sx={{ 
        position: 'absolute', 
        top: 16, 
        left: 16, 
        zIndex: 1000 
      }}>
<IconButton 
  onClick={() => navigate(-1)}
  sx={{ 
    color: 'white',
    backgroundColor: 'rgba(14, 22, 33, 0.8)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      backgroundColor: 'rgba(14, 22, 33, 0.2)',
    },
  }}
>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <YMaps>
        <Map
          defaultState={{
            center: [userLocation?.lat || 55.751244, userLocation?.lng || 37.618423],
            zoom: 11,
          }}
          width="100%"
          height="100vh"
        >
          <Clusterer
            options={{
              preset: 'islands#invertedBlueClusterIcons',
              groupByCoordinates: false,
            }}
          >
            {availableBars.map((bar) => (
              <Placemark
                key={bar.id}
                geometry={[bar.lat, bar.lng]}
                properties={{
                  balloonContentHeader: bar.name,
                  balloonContentBody: `Цена: ${bar.beers.find(b => b.id === beer.id).price}₽`,
                }}
                options={{
                  preset: 'islands#blueDotIcon',
                  iconCaption: bar.name,
                }}
              />
            ))}
          </Clusterer>
          {userLocation && (
            <Placemark
              geometry={[userLocation.lat, userLocation.lng]}
              options={{
                preset: 'islands#redCircleDotIcon'
              }}
              properties={{
                iconContent: 'Вы здесь'
              }}
            />
          )}
        </Map>
      </YMaps>
    </div>
  );
}

export default BeerMap; 