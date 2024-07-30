// Updated BarMap Component

import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../geolocationContext';
import { bars } from '../data';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './BarMap.css';

function BarMap() {
  const [sortedBars, setSortedBars] = useState([]);
  const [selectedBarIndex, setSelectedBarIndex] = useState(0);
  const { location: userLocation, loading } = useGeolocation();
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (userLocation) {
      const barsWithDistance = bars.map(bar => ({
        ...bar,
        distance: calculateDistance(userLocation, { lat: bar.lat, lng: bar.lng })
      }));
      const sorted = barsWithDistance.sort((a, b) => a.distance - b.distance);
      setSortedBars(sorted);
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapRef.current && sortedBars.length > 0) {
      const selectedBar = sortedBars[selectedBarIndex];
      mapRef.current.setCenter([selectedBar.lat, selectedBar.lng], 15);
    }
  }, [selectedBarIndex, sortedBars]);

  const calculateDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toggleListView = () => {
    setShowList(prevShowList => !prevShowList);
  };

  const openBarDetails = (bar) => {
    navigate(`/bar/${bar.id}`, { state: { bar } });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="bar-map-container">
      <div className={`map-view ${showList ? 'hidden' : ''}`}>
        <Typography variant="h6" className="map-title">
          Найти бар на карте
        </Typography>
        {userLocation && (
          <YMaps>
            <Map
              defaultState={{
                center: [userLocation.lat, userLocation.lng],
                zoom: 13
              }}
              width="100%"
              height="82%"
              instanceRef={mapRef}
            >
              {sortedBars.map((bar) => (
                <Placemark
                  key={bar.id}
                  geometry={[bar.lat, bar.lng]}
                  properties={{
                    balloonContent: bar.name
                  }}
                  options={{
                    preset: 'islands#nightCircleDotIcon',
                    iconCaption: bar.name
                  }}
                  onClick={() => openBarDetails(bar)}
                />
              ))}
            </Map>
          </YMaps>
        )}
        <Button
          className="toggle-list-button"
          variant="outlined"
          onClick={toggleListView}
          startIcon={<ArrowDownwardIcon />}
          sx={{
            color: '#F2DDCF',
            borderColor: '#F2DDCF',
            '&:hover': {
              borderColor: '#F2DDCF',
              backgroundColor: 'rgba(242, 221, 207, 0.1)',
            },
          }}
        >
          List View
        </Button>
      </div>
      <div className={`list-view ${showList ? '' : 'hidden'}`}>
        <Button
          className="back-to-map-button"
          variant="contained"
          onClick={toggleListView}
          startIcon={<ArrowUpwardIcon />}
          sx={{
            color: '#F2DDCF',
            borderColor: '#F2DDCF',
            '&:hover': {
              borderColor: '#F2DDCF',
              backgroundColor: 'rgba(242, 221, 207, 0.1)',
            },
          }}
        >
          Back to Map
        </Button>
        <div className="bars-list">
          {sortedBars.map((bar) => (
            <div key={bar.id} className="bar-item" onClick={() => openBarDetails(bar)}>
              <Typography variant="h6">{bar.name}</Typography>
              <Typography variant="body2">Пиво: {bar.beers.join(', ')}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarMap;
