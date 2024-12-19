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
import { distanceFilters } from '../data';
import StarIcon from '@mui/icons-material/Star';
import MapIcon from '@mui/icons-material/Map';

function BeerDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { beer } = location.state;
  const [sortBy, setSortBy] = useState('distance'); // 'distance' или 'price'
  const { location: userLocation } = useGeolocation();
  const [availableBars, setAvailableBars] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(null);

  useEffect(() => {
    if (userLocation) {
      let bars = getBarsWithBeer(userLocation);
      setAvailableBars(bars);
    }
  }, [userLocation, sortBy, distanceFilter]);

  const handleMapClick = () => {
    navigate('/beer-map', { state: { beer } });
  };

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
  
    if (distanceFilter) {
      filteredBars = filteredBars.filter(bar => {
        if (distanceFilter === 1000) return bar.distance <= 1;
        if (distanceFilter === 3000) return bar.distance <= 3;
        if (distanceFilter === 5000) return bar.distance > 3;
        return true;
      });
    }
  
    if (sortBy === 'distance') {
      filteredBars.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'price') {
      filteredBars.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filteredBars.sort((a, b) => b.rating - a.rating);
    }
  
    return filteredBars;
  };


  return (
<div className="beer-detail-page">
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '16px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }}>
    <IconButton onClick={() => navigate(-1)} sx={{ color: '#F2DDCF' }}>
      <ArrowBackIcon />
    </IconButton>
    <Button
      onClick={handleMapClick}
      startIcon={<MapIcon />}
      sx={{
        color: '#F2DDCF',
        backgroundColor: 'rgba(242, 221, 207, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '4px 5px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(242, 221, 207, 0.2)',
        },
      }}
    >
      На карте
    </Button>
  </Box>
<Box className="beer-header">
  <img src={beer.image} alt={beer.name} className="beer-image" />
  <Box className="beer-content">
    <Typography variant="h4" className="beer-name">{beer.name}</Typography>
    <Box className="beer-stats">
      <Typography>ABV: {beer.abv}%</Typography>
      <Typography>IBU: {beer.ibu}</Typography>
    </Box>
    <Typography className="beer-description">{beer.description}</Typography>
  </Box>
</Box>

      <Box className="filter-buttons">

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
<Button
  onClick={() => setSortBy('rating')}
  sx={{
    color: sortBy === 'rating' ? '#0E1621' : '#F2DDCF',
    backgroundColor: sortBy === 'rating' ? '#F2DDCF' : 'transparent',
    borderRadius: '20px',
    border: '1px solid #F2DDCF',
    '&:hover': {
      backgroundColor: sortBy === 'rating' ? '#E5C8B5' : 'rgba(242, 221, 207, 0.1)',
    },
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    padding: '4px 12px',
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px'
  }}
  startIcon={<StarIcon />}
>
  По рейтингу
</Button>
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
      </Box>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', padding: '0 8px', mb: 2 }}>
  {distanceFilters.map((filter) => (
    <Button
      key={filter.value}
      onClick={() => setDistanceFilter(filter.value)}
      sx={{
        color: distanceFilter === filter.value ? '#0E1621' : '#F2DDCF',
        backgroundColor: distanceFilter === filter.value ? '#F2DDCF' : 'transparent',
        borderRadius: '20px',
        border: '1px solid #F2DDCF',
        '&:hover': {
          backgroundColor: distanceFilter === filter.value ? '#E5C8B5' : 'rgba(242, 221, 207, 0.1)',
        },
        whiteSpace: 'nowrap',
        minWidth: 'auto',
        padding: '4px 12px',
        textTransform: 'none',
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: '14px'
      }}
    >
      {filter.label}
    </Button>
  ))}
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
              До 23.00 ⚫️ м. Павелецкая ⚫️ {bar.distance.toFixed(2)} км ⚫️ {bar.rating} ⭐️
            </Typography>
            <Typography className="bar-price">
            {bar.price} ₽
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