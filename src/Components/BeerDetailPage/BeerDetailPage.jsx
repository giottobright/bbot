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

      <Box className="sort-buttons">
        <Button
          startIcon={<LocationOnIcon />}
          onClick={() => setSortBy('distance')}
          variant={sortBy === 'distance' ? "contained" : "outlined"}
          sx={{
            color: '#F2DDCF',
            borderColor: '#F2DDCF',
            backgroundColor: sortBy === 'distance' ? 'rgba(242, 221, 207, 0.2)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(242, 221, 207, 0.1)',
            },
          }}
        >
          По расстоянию
        </Button>
        <Button
          startIcon={<AttachMoneyIcon />}
          onClick={() => setSortBy('price')}
          variant={sortBy === 'price' ? "contained" : "outlined"}
          sx={{
            color: '#F2DDCF',
            borderColor: '#F2DDCF',
            backgroundColor: sortBy === 'price' ? 'rgba(242, 221, 207, 0.2)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(242, 221, 207, 0.1)',
            },
          }}
        >
          По цене
        </Button>
      </Box>

      <Typography variant="h6" className="section-title">
        Где можно попробовать
      </Typography>

      <div className="bars-list">
        {availableBars.map((bar) => (
          <div key={bar.id} className="bar-item" onClick={() => navigate(`/bar/${bar.id}`, { state: { bar } })}>
            <Card sx={{ maxWidth: 555, bgcolor: 'rgba(242, 221, 207, 0.05)' }}>
              <CardMedia
                sx={{ height: 170 }}
                image={bar.image}
                title={bar.name}
              />
              <CardContent className='cardcontentbar'>
                <Typography level="title-lg" textColor="#F2DDCF" className='name'>
                  {bar.name}
                </Typography>
                <Typography textColor="#F2DDCF" className='description'>
                  До 23.00 ⚫️ м. Павелецкая ⚫️ {bar.distance.toFixed(2)} км ⚫️ {bar.price} ₽
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeerDetailPage; 