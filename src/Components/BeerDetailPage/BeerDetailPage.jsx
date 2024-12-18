import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Card, CardMedia, CardContent, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SortIcon from '@mui/icons-material/Sort';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { bars } from '../data';
import './BeerDetailPage.css';
import { useGeolocation } from '../geolocationContext';

function BeerDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { beer } = location.state;
  const [sortBy, setSortBy] = useState('distance'); // 'distance' или 'price'
  const { location: userLocation } = useGeolocation();
  const [availableBars, setAvailableBars] = useState([]);

  useEffect(() => {
    if (userLocation) {
      let bars = getBarsWithBeer(userLocation);
      setAvailableBars(bars);
    }
  }, [userLocation, sortBy]);

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getBarsWithBeer = (userLocation) => {
    let filteredBars = bars.filter(bar => 
      bar.beers.some(b => b.id === beer.id)
    ).map(bar => ({
      ...bar,
      price: bar.beers.find(b => b.id === beer.id).price,
      distance: calculateDistance(
        { lat: bar.lat, lng: bar.lng },
        userLocation
      )
    }));

    if (sortBy === 'distance') {
      filteredBars.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'price') {
      filteredBars.sort((a, b) => a.price - b.price);
    }

    return filteredBars;
  };


  return (
    <div className="beer-detail-page">
      <IconButton className="back-button" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      
      <Box className="beer-header">
        <img src={beer.image} alt={beer.name} className="beer-image" />
        <Typography variant="h4" className="beer-name">{beer.name}</Typography>
        <Box className="beer-stats">
          <Typography>ABV: {beer.abv}%</Typography>
          <Typography>IBU: {beer.ibu}</Typography>
        </Box>
        <Typography className="beer-description">{beer.description}</Typography>
      </Box>

      <Box className="filter-buttons">
      <Button
  onClick={() => setSortBy('distance')}
  sx={{
    color: sortBy === 'distance' ? '#0E1621' : '#F2DDCF',
    backgroundColor: sortBy === 'distance' ? '#F2DDCF' : 'transparent',
    borderRadius: '20px',
    border: '1px solid #F2DDCF',
    '&:hover': {
      backgroundColor: sortBy === 'distance' ? '#E5C8B5' : 'rgba(242, 221, 207, 0.1)',
    },
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    padding: '4px 12px',
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px'
  }}
  startIcon={<LocationOnIcon />}
>
  По расстоянию
</Button>
<Button
  onClick={() => setSortBy('price')}
  sx={{
    color: sortBy === 'price' ? '#0E1621' : '#F2DDCF',
    backgroundColor: sortBy === 'price' ? '#F2DDCF' : 'transparent',
    borderRadius: '20px',
    border: '1px solid #F2DDCF',
    '&:hover': {
      backgroundColor: sortBy === 'price' ? '#E5C8B5' : 'rgba(242, 221, 207, 0.1)',
    },
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    padding: '4px 12px',
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px'
  }}
  startIcon={<AttachMoneyIcon />}
>
  По цене
</Button>
      </Box>

      <Typography fontSize={20} fontWeight={550} className="section-title">
        Где можно попробовать
      </Typography>

      <div className="bars-list">
  {availableBars.map((bar) => (
    <div key={bar.id} className="bar-item" onClick={() => navigate(`/bar/${bar.id}`, { state: { bar } })}>
      <div className="bar-card">
        <div className="bar-image-container">
          <img src={bar.image} alt={bar.name} className="bar-image" />
          <div className="bar-content-overlay">
            <Typography variant="h6" className="bar-title">
              {bar.name}
            </Typography>
            <Typography className="bar-details">
              До 23.00 ⚫️ м. Павелецкая ⚫️ {bar.distance.toFixed(2)} км ⚫️ {bar.price} ₽
            </Typography>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default BeerDetailPage; 