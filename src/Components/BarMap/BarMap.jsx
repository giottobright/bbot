// Updated BarMap Component

import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
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
        <div className="bars-list">
          {sortedBars.map((bar) => (
            <div key={bar.id} className="bar-item" onClick={() => openBarDetails(bar)}>
              <Card sx={{ maxWidth: 345, bgcolor: 'rgba(242, 221, 207, 0.05)' }}>
                    <CardMedia
                      sx={{ height: 170 }}
                      image={bar.image}
                      title="green iguana"
                    />
          <CardContent className='cardcontentbar' sx={{ justifyContent: 'flex-end', position: 'relative' }}>
            <Typography level="title-lg" textColor="#F2DDCF" className='name'>
              {bar.name}
            </Typography>
            <Typography textColor="#F2DDCF" className='description'>
              До 23.00 ⚫ м. Павелецкая ⚫ 3 мин на авто
            </Typography>
          </CardContent>
              </Card>
            </div>
            
          ))}
        </div>
    </div>
  );
}

export default BarMap;
