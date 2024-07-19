import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, Button, CircularProgress } from '@mui/material';
import './MapPage.css';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../geolocationContext';

function MapPage() {
    const location = useLocation();
    const [selectedBar, setSelectedBar] = useState(null);
    const { location: userLocation, loading, error } = useGeolocation();
    const { beerName, bars: initialBars } = location.state || { beerName: '', bars: [] };
    const [bars, setBars] = useState(initialBars);
  
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

  useEffect(() => {
    if (selectedBar && mapRef.current) {
      mapRef.current.setCenter([selectedBar.lat, selectedBar.lng], 15);
    }
  }, [selectedBar]);

  const handleBarSelect = (bar) => {
    setSelectedBar(bar);
    // Перемещаем выбранный бар в начало списка
    const newBars = [bar, ...bars.filter(b => b.id !== bar.id)];
    setBars(newBars);
    
    // Прокрутка к карте
    if (mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Прокрутка к выбранному бару в списке (после небольшой задержки)
    setTimeout(() => {
      const element = document.getElementById(`bar-${bar.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 500); // Задержка в 500 мс
  };

  const openYandexMaps = (bar) => {
    const url = `https://yandex.ru/maps/?rtext=${userLocation.lat},${userLocation.lng}~${bar.lat},${bar.lng}&rtt=auto`;
    window.open(url, '_blank');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="beer-map-page">
      <div ref={mapContainerRef}>
        {userLocation && (
          <YMaps>
            <Map
              defaultState={{
                center: [userLocation.lat, userLocation.lng],
                zoom: 13
              }}
              width="100%"
              height="400px"
              instanceRef={mapRef}
            >
              {bars.map((bar) => (
                <Placemark
                  key={bar.id}
                  geometry={[bar.lat, bar.lng]}
                  onClick={() => handleBarSelect(bar)}
                />
              ))}
            </Map>
          </YMaps>
        )}
      </div>
      <div className="bars-list">
        {bars.map((bar) => (
          <Card
            key={bar.id}
            id={`bar-${bar.id}`}
            className={`bar-card ${selectedBar?.id === bar.id ? 'selected' : ''}`}
            onClick={() => handleBarSelect(bar)}
          >
            <CardActionArea>
              <Box p={2} className="card-content">
                <div className="text-content">
                  <Typography variant="h6">{bar.name}</Typography>
                  <Typography variant="body2">{beerName}</Typography>
                </div>
                <Button 
                  variant="contained"
                  className="card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openYandexMaps(bar);
                  }}
                >🗺️</Button>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MapPage;


