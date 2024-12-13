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
        if (userLocation && nearbyBeers.length === 0) {
          let SEARCH_RADIUS = 5; // Начальный радиус
          let nearbyBars = bars.filter(bar => {
            const distance = calculateDistance(
              userLocation,
              { lat: bar.lat, lng: bar.lng }
            );
            return distance <= SEARCH_RADIUS;
          });
      
          // Если в радиусе 5 км нет баров, расширяем до 10 км
          if (nearbyBars.length === 0) {
            SEARCH_RADIUS = 10;
            nearbyBars = bars.filter(bar => {
              const distance = calculateDistance(
                userLocation,
                { lat: bar.lat, lng: bar.lng }
              );
              return distance <= SEARCH_RADIUS;
            });
            console.log('Радиус поиска расширен до 10 км');
          }
      
          const availableBeers = nearbyBars.flatMap(bar => 
            bar.beers.map(beer => ({
              ...beer,
              barName: bar.name,
              barId: bar.id,
              distance: calculateDistance(userLocation, { lat: bar.lat, lng: bar.lng })
            }))
          );
      
          const uniqueBeers = [...new Set(availableBeers.map(beer => beer.id))]
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
      
          // Случайно перемешиваем массив и берем первые 6 элементов
          const randomBeers = uniqueBeers
            .sort(() => Math.random() - 0.5)
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
        <div className="nearby-beers-header">
        <Typography fontSize={20} fontWeight={550} className="nearby-beers-title">
          Топ пиво рядом
        </Typography>
        </div>
        <Grid container spacing={1} className="nearby-beers-grid">
          {nearbyBeers.map((beer) => (
            <Grid item xs={6} key={`${beer.id}-${beer.barId}`}>
              <Card 
                sx={{ 
                  height: 140,
                  bgcolor: 'rgba(242, 221, 207, 0.05)',
                  borderRadius: '12px'
                }} 
                variant="plain"
              >
                <CardCover>
                  <img
                    src={beer.image}
                    alt={beer.label}
                    loading="lazy"
                    style={{
                      objectFit: beer.imageType === 'square' ? 'contain' : 'cover',
                      backgroundColor: beer.imageType === 'square' ? 'rgba(242, 221, 207, 0.05)' : 'transparent'
                    }}
                  />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 200px)',
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

export default NearbyBeersSection;

