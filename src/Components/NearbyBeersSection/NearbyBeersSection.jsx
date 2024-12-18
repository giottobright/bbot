import React, { useEffect, useState, useMemo } from 'react';
import { useGeolocation } from '../geolocationContext';
import { bars, beerTypes, userFavorites } from '../data';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import './NearbyBeersSection.css';
import { useUser } from '../../context/UserContext';

function NearbyBeersSection() {
  const [nearbyBeers, setNearbyBeers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('popular');
  const { location: userLocation, loading } = useGeolocation();
  const navigate = useNavigate();
  const { userId } = useUser();

  const calculateDistance = useMemo(() => (point1, point2) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  const getNearbyBars = useMemo(() => (location) => {
    let SEARCH_RADIUS = 5;
    let nearbyBars = bars.filter(bar => {
      const distance = calculateDistance(location, { lat: bar.lat, lng: bar.lng });
      return distance <= SEARCH_RADIUS;
    });

    if (nearbyBars.length === 0) {
      SEARCH_RADIUS = 10;
      nearbyBars = bars.filter(bar => {
        const distance = calculateDistance(location, { lat: bar.lat, lng: bar.lng });
        return distance <= SEARCH_RADIUS;
      });
    }
    return nearbyBars;
  }, [calculateDistance]);

  const getAvailableBeers = useMemo(() => (nearbyBars) => {
    if (!userLocation) return [];
    
    const availableBeers = nearbyBars.flatMap(bar =>
      bar.beers.map(beer => ({
        ...beer,
        barName: bar.name,
        barId: bar.id,
        distance: calculateDistance(userLocation, { lat: bar.lat, lng: bar.lng })
      }))
    );

    return [...new Set(availableBeers.map(beer => beer.id))]
      .map(beerId => {
        const beerInfo = beerTypes.find(type => type.id === beerId);
        const barInfo = availableBeers.find(beer => beer.id === beerId);
        return {
          ...beerInfo,
          barName: barInfo.barName,
          barId: barInfo.barId,
          price: barInfo.price,
          distance: barInfo.distance.toFixed(1)
        };
      });
  }, [userLocation, calculateDistance]);

  useEffect(() => {
    if (!loading && userLocation) {
      const nearbyBars = getNearbyBars(userLocation);
      const allAvailableBeers = getAvailableBeers(nearbyBars);
      
      let filteredBeers = [];
      switch (activeFilter) {
        case 'popular':
          filteredBeers = allAvailableBeers
            .sort((a, b) => b.popularity - a.popularity);
          break;
        case 'favorite':
          const userFavs = userFavorites[userId] || [];
          filteredBeers = allAvailableBeers
            .filter(beer => userFavs.includes(beer.id));
          break;
        case 'new':
          filteredBeers = allAvailableBeers
            .filter(beer => beer.isNew)
            .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
          break;
        default:
          filteredBeers = allAvailableBeers;
      }
      
      setNearbyBeers(filteredBeers.slice(0, 4));
    }
  }, [userLocation, activeFilter, loading, getNearbyBars, getAvailableBeers, userId]);

  const handleBeerClick = (beer) => {
    navigate(`/beer/${beer.id}`, { 
      state: { 
        beer: {
          ...beer,
          id: beer.id,
          name: beer.label,
          description: beer.description || 'Описание отсутствует',
          abv: beer.abv || 'N/A',
          ibu: beer.ibu || 'N/A',
        } 
      } 
    });
  };

  const filters = [
    { id: 'popular', label: 'Популярное рядом' },
    { id: 'favorite', label: 'Любимое рядом' },
    { id: 'new', label: 'Новинки' }
  ];

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="nearby-beers-section">
      <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto', paddingBottom: '10px' }}>
        {filters.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            sx={{
              color: activeFilter === filter.id ? '#0E1621' : '#F2DDCF',
              backgroundColor: activeFilter === filter.id ? '#F2DDCF' : 'transparent',
              borderRadius: '20px',
              border: '1px solid #F2DDCF',
              '&:hover': {
                backgroundColor: activeFilter === filter.id ? '#E5C8B5' : 'rgba(242, 221, 207, 0.1)',
              },
              whiteSpace: 'nowrap',
              minWidth: 'auto',
              padding: '4px 12px'
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        {nearbyBeers.map((beer) => (
          <Grid item xs={6} key={beer.id}>
            <Card
              onClick={() => handleBeerClick(beer)}
              sx={{
                height: 160,
                cursor: 'pointer',
                backgroundColor: 'rgba(242, 221, 207, 0.05)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: 'none'
              }}
            >
              <CardCover>
                <img 
                  src={beer.image} 
                  alt={beer.label}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
              />
              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography
                  level="title-lg"
                  textColor="#fff"
                  sx={{ 
                    textShadow: '0 0 10px rgba(0,0,0,0.5)',
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }}
                >
                  {beer.label}
                </Typography>
                <Typography
                  textColor="neutral.300"
                  sx={{ 
                    textShadow: '0 0 10px rgba(0,0,0,0.5)',
                    fontSize: '0.875rem'
                  }}
                >
                  {beer.barName} • {beer.distance} км
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NearbyBeersSection;

