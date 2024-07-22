import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Grid, CardActionArea, CardMedia, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';
import { useGeolocation } from '../geolocationContext';
import { categories, types, beerTypes, bars, distanceFilters } from '../data';
import { useSearch } from '../SearchContext';

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [isType, setIsType] = useState(false);
  const { location: userLocation, loading: locationLoading } = useGeolocation();
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { searchQuery, searchResults } = useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');

  useEffect(() => {
    if (location.state) {
      setSelectedId(location.state.selectedId);
      setIsType(location.state.isType);
      console.log('Location state:', location.state);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDescriptionAndLabel = () => {
      const categoryOrType = isType
        ? types.find(type => type.id === selectedId)
        : categories.find(category => category.id === selectedId);

      setCategoryDescription(categoryOrType?.description || '');
      setCategoryLabel(categoryOrType?.label || '');
      console.log('Fetched category/type:', categoryOrType);
    };

    if (selectedId !== null) {
      fetchDescriptionAndLabel();
    }

    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedId, isType]);

  useEffect(() => {
    setIsSearching(searchQuery.length > 0);
  }, [searchQuery]);

  const handleDistanceChange = useCallback((value) => {
    setSelectedDistance(value);
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Convert to meters
  };

  const filteredBars = useMemo(() => {
    if (!userLocation || selectedDistance === null) return bars;
    return bars.filter(bar => {
      const distance = calculateDistance(
        userLocation.lat, userLocation.lng,
        bar.lat, bar.lng
      );
      return distance <= selectedDistance;
    });
  }, [userLocation, selectedDistance]);

  const availableBeers = useMemo(() => {
    const availableBeerIds = [...new Set(filteredBars.flatMap(bar => bar.beers))];
    console.log('Available beer IDs:', availableBeerIds);
    return availableBeerIds;
  }, [filteredBars]);

  const filteredBeerTypes = useMemo(() => {
    let beersToFilter = searchQuery ? searchResults : beerTypes;

    console.log('Selected ID:', selectedId);
    console.log('Is Type:', isType);
    console.log('Beers to filter:', beersToFilter);

    const filtered = beersToFilter.filter(beer => 
      (!selectedId || 
      (isType
        ? (Array.isArray(beer.types) ? beer.types.includes(selectedId) : beer.types === selectedId)
        : (Array.isArray(beer.categories) ? beer.categories.includes(selectedId) : beer.categories === selectedId)))
      && availableBeers.includes(beer.id)
    );

    console.log('Filtered beers:', filtered);

    return filtered;
  }, [selectedId, isType, searchQuery, searchResults, beerTypes, availableBeers]);

  if (isLoading || locationLoading) {
    return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  }

  return (
    <div className="main-screen">
      {!isSearching && (
        <Box className="category-description">
          <Typography variant="h6" className="category-title">
            {categoryLabel || 'Все'}
          </Typography>
          {categoryDescription && (
            <Typography variant="body1" className="category-description-text">
              {categoryDescription}
            </Typography>
          )}
        </Box>
      )}
      
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
        {filteredBeerTypes.length > 0 ? (
          filteredBeerTypes.map((beer, index) => (
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
          ))
        ) : (
          <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
            Нет доступных сортов пива для выбранной {isType ? 'типа' : 'категории'} или расстояния.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Form;
