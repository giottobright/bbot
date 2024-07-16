import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea } from '@mui/material';
import './MapPage.css';

function MapPage() {
  const location = useLocation();
  const [selectedBar, setSelectedBar] = useState(null);
  const { beerName, bars } = location.state || { beerName: '', bars: [] };

  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedBar && mapRef.current) {
      mapRef.current.setCenter([selectedBar.lat, selectedBar.lng], 15);
    }
  }, [selectedBar]);

  const handlePlacemarkClick = (bar) => {
    setSelectedBar(bar);
    const element = document.getElementById(`bar-${bar.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="beer-map-page">
      <YMaps>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
          width="100%"
          height="400px"
          instanceRef={mapRef}
        >
          {bars.map((bar) => (
            <Placemark
              key={bar.id}
              geometry={[bar.lat, bar.lng]}
              onClick={() => handlePlacemarkClick(bar)}
            />
          ))}
        </Map>
      </YMaps>
      <div className="bars-list">
        {bars.map((bar) => (
          <Card
            key={bar.id}
            id={`bar-${bar.id}`}
            className={`bar-card ${selectedBar?.id === bar.id ? 'selected' : ''}`}
            onClick={() => setSelectedBar(bar)}
          >
            <CardActionArea>
              <Box p={2}>
                <Typography variant="h6">{bar.name}</Typography>
                <Typography variant="body2">Доступные напитки: {bar.beers.join(', ')}</Typography>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MapPage;
