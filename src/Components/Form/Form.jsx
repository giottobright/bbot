import React, { useState, useEffect } from 'react';
import { Card, Grid, CardActionArea, CardMedia, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { useLocation } from 'react-router-dom';
import { useGeolocation } from '../geolocationContext';
import { categories, types, beerTypes, bars, distanceFilters } from '../data';


// Импорты изображений


function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBeer, setSelectedBeer] = useState(null);
  const { location: userLocation, loading, error } = useGeolocation();
  const [selectedDistance, setSelectedDistance] = useState(distanceFilters[0].value);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      webApp.expand();
    }

    if (location.state && location.state.selectedCategory) {
      setSelectedCategoryId(location.state.selectedCategory);
    }
  }, [location]);

  const handleBeerSelect = (beerName) => {
    setSelectedBeer(beerName);
    const relevantBars = bars.filter(bar => bar.beers.includes(beerName));
    navigate('/mappage', { state: { beerName, bars: relevantBars } });
  };

  const handleDistanceChange = (value) => {
    setSelectedDistance(value);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Расстояние в км
    return d * 1000; // Переводим в метры
  };

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId) 
    || types.find(type => type.id === selectedCategoryId) 
    || categories[0];
  
  const filteredBeerTypes = selectedCategoryId
    ? beerTypes.filter(beer => 
        Array.isArray(beer.categories) 
          ? beer.categories.includes(selectedCategoryId)
          : beer.categories === selectedCategoryId)
    : beerTypes;

  const filteredBars = userLocation
    ? bars.filter(bar => {
        if (selectedDistance === null) return true;
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          bar.lat, bar.lng
        );
        return distance <= selectedDistance;
      })
    : bars;

  const availableBeers = [...new Set(filteredBars.flatMap(bar => bar.beers))];

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="main-screen">
      <Box className="category-description">
        <Typography variant="h6" className="category-title">
          {selectedCategory.label}
        </Typography>
        <Typography variant="body2" className="category-text">
          {selectedCategory.description}
        </Typography>
      </Box>

      <Box className="distance-filter-buttons">
        {distanceFilters.map((filter) => (
          <Button
            key={filter.value || 'no-filter'}
            onClick={() => handleDistanceChange(filter.value)}
            className={`filter-button ${selectedDistance === filter.value ? 'active' : ''}`}
          >
            {filter.label}
          </Button>
        ))}
      </Box>

      <Grid container spacing={0.5} className="category-container">
        {filteredBeerTypes
          .filter(beer => availableBeers.includes(beer.label))
          .map((beer, index) => (
          <Grid item xs={12} sm={12} md={12} key={index} className="gridcard">
            <Card className="card" sx={{ borderRadius: '12px' }}>
              <CardActionArea 
                sx={{ backgroundColor: '#F2DDCF', borderRadius: '16px' }} 
                onClick={() => handleBeerSelect(beer.label)}
              >
               <Box className="cardContent">
                  <Box className="cardImageContainer">
                    <CardMedia
                      component="img"
                      className={`cardImage ${beer.imageType}`}
                      image={beer.image}
                      alt="beer image"
                    />
                  </Box>
                  <Box className="cardTextContent">
                    <Typography variant="h6" className="cardTitle" fontFamily={'Comfortaa'}>
                      {beer.label}
                    </Typography>
                    <Typography variant="h10" className="cardTitleInfo" fontFamily={'Comfortaa'}>
                      {beer.labelinfo}
                    </Typography>
                    <Box className="cardDescriptionContainer">
                      <Typography variant="body3" className="cardDescription" fontFamily={'Comfortaa'}>
                        {beer.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>   
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Form;
