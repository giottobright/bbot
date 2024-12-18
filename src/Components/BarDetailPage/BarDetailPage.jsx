import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, Box, IconButton, Button } from '@mui/material';
import { beerTypes } from '../data';
import './BarDetailPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BeerCard from '../BeerCard/BeerCard';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { types, countries, categories } from '../data';
function BarDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bar } = location.state;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');

  const getBeerDetails = (beerId) => beerTypes.find(beer => beer.id === beerId);

  const handleTypeClick = (event) => {
    setTypeAnchorEl(event.currentTarget);
  };

  const handleCountryClick = (event) => {
    setCountryAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTypeAnchorEl(null);
    setCountryAnchorEl(null);
  };

  const allFilters = useMemo(() => {
    return ['Все', ...categories.map(cat => cat.label), ...types.map(type => type.label)];
  }, []);

  const filteredBeers = useMemo(() => {
    let filtered = bar.beers.map(beerItem => {
      const beerDetails = getBeerDetails(beerItem.id);
      return { ...beerDetails, price: beerItem.price };
    });

    if (searchQuery) {
      filtered = filtered.filter(beer => 
        beer.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter !== 'Все') {
      filtered = filtered.filter(beer => {
        const categoryMatch = categories.find(cat => cat.label === activeFilter);
        const typeMatch = types.find(type => type.label === activeFilter);
        
        if (categoryMatch) {
          return beer.categories?.includes(categoryMatch.id);
        }
        if (typeMatch) {
          return beer.types?.includes(typeMatch.id);
        }
        return false;
      });
    }

    return filtered;
  }, [bar.beers, searchQuery, activeFilter]);


  return (
    <div className="bar-detail-page">
      <div className="bar-header">
        <img src={bar.image} alt={bar.name} className="bar-main-image" />
        <div className="bar-header-overlay">
          <div className="right-buttons">
            <IconButton className="icon-button" sx={{ color: '#F2DDCF' }}>
              <LanguageIcon />
            </IconButton>
            <IconButton className="icon-button" sx={{ color: '#F2DDCF' }}>
              <PhoneIcon />
            </IconButton>
          </div>
          <div className="bar-info">
            <IconButton className="back-button" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Button startIcon={<MapIcon />} className="map-button">
              На карте
            </Button>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h4" className="bar-name">{bar.name}</Typography>
              <IconButton className="icon-button favorite-bar-button" 
                sx={{ color: '#F2DDCF', bgcolor: 'rgba(242, 221, 207, 0.1)' }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
            <div className="bar-info-strip">
              <div className="info-item" id='auto'>
                <DirectionsCarIcon />
                <span>15 мин</span>
              </div>
              <div className="info-item" id='walk'>
                <DirectionsWalkIcon />
                <span>30 мин</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bar-photos-container">
        <div className="bar-photos">
          {bar.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`${bar.name} photo ${index + 1}`} className="bar-photo" />
          ))}
        </div>
      </div>

      <Typography variant="h6" className="section-title">
        Доступные сорта пива
      </Typography>
      <Box sx={{ 
        padding: '0 16px',
        backgroundColor: 'rgba(242, 221, 207, 0.1)',
        borderRadius: '12px',
        margin: '16px 8px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <SearchIcon sx={{ color: '#F2DDCF', mr: 1 }} />
        <InputBase
          placeholder="Поиск пива..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            color: '#F2DDCF',
            width: '100%',
            '& input::placeholder': {
              color: '#F2DDCF',
              opacity: 0.7,
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', padding: '0 8px', mb: 2 }}>
        {allFilters.map((filter) => (
          <Button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            sx={{
              color: activeFilter === filter ? '#0E1621' : '#F2DDCF',
              backgroundColor: activeFilter === filter ? '#F2DDCF' : 'transparent',
              borderRadius: '20px',
              border: '1px solid #F2DDCF',
              '&:hover': {
                backgroundColor: activeFilter === filter ? '#E5C8B5' : 'rgba(242, 221, 207, 0.1)',
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
            {filter}
          </Button>
        ))}
      </Box>
      <Grid container spacing={2} className="beers-container">
        {filteredBeers.map((beer) => (
          <Grid item xs={12} sm={6} md={4} key={beer.id}>
            <BeerCard beer={beer} price={beer.price} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default BarDetailPage;