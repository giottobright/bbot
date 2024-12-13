import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../geolocationContext';
import { bars, beerTypes } from '../data';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import './NearbyBeersSection.css';

function NearbyBeersSection() {
  const [nearbyBeers, setNearbyBeers] = useState([]);
  const { location: userLocation } = useGeolocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLocation) {
      // Получаем бары в радиусе 1 км
      const nearbyBars = bars.filter(bar => {
        const distance = calculateDistance(
          userLocation,
          { lat: bar.lat, lng: bar.lng }
        );
        return distance <= 1;
      });

      // Собираем все доступное пиво из ближайших баров
      const availableBeers = nearbyBars.flatMap(bar => 
        bar.beers.map(beer => ({
          ...beer,
          barName: bar.name,
          barId: bar.id
        }))
      );

      // Получаем уникальные сорта пива
      const uniqueBeers = [...new Set(availableBeers.map(beer => beer.id))]
        .map(beerId => {
          const beerInfo = beerTypes.find(type => type.id === beerId);
          const barInfo = availableBeers.find(beer => beer.id === beerId);
          return {
            ...beerInfo,
            barName: barInfo.barName,
            barId: barInfo.barId,
            price: barInfo.price
          };
        });

      // Случайно выбираем 6 сортов
      const randomBeers = uniqueBeers
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      setNearbyBeers(randomBeers);
    }
  }, [userLocation]);

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

  const handleBarClick = (barId) => {
    navigate(`/bar/${barId}`);
  };

  return (
    <div className="nearby-beers-section">
      <Typography level="h5" sx={{ mb: 2, color: '#F2DDCF' }}>
        Топ пиво рядом
      </Typography>
      <Grid container spacing={2}>
        {nearbyBeers.map((beer) => (
          <Grid item xs={6} key={`${beer.id}-${beer.barId}`}>
            <Card sx={{ height: 200 }} variant="plain">
              <CardCover>
                <img
                  src={beer.image}
                  alt={beer.label}
                  loading="lazy"
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
              />
              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="title-md" textColor="#F2DDCF">
                  {beer.label}
                </Typography>
                <Typography level="body-sm" textColor="#F2DDCF">
                  {beer.labelinfo}
                </Typography>
                <Typography level="body-sm" textColor="#F2DDCF">
                  {beer.price} ₽ • {beer.barName}
                </Typography>
                <Button
                  variant="outlined"
                  size="sm"
                  sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    color: '#F2DDCF',
                    borderColor: '#F2DDCF',
                    '&:hover': {
                      borderColor: '#F2DDCF',
                      backgroundColor: 'rgba(242, 221, 207, 0.1)',
                    },
                  }}
                  onClick={() => handleBarClick(beer.barId)}
                >
                  В баре
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NearbyBeersSection; 