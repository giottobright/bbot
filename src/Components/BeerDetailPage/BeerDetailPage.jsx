import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Button, Card, CardMedia, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsIcon from '@mui/icons-material/Directions';
import { bars } from '../data';
import './BeerDetailPage.css';

function BeerDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { beer } = location.state;

  const getBarsWithBeer = () => {
    return bars.filter(bar => 
      bar.beers.some(b => b.id === beer.id)
    ).map(bar => ({
      ...bar,
      price: bar.beers.find(b => b.id === beer.id).price
    }));
  };

  const availableBars = getBarsWithBeer();

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

      <Typography variant="h6" className="section-title">
        Где можно попробовать
      </Typography>

      <Box className="bars-list">
        {availableBars.map(bar => (
          <Card 
            key={bar.id} 
            className="bar-card"
            onClick={() => navigate(`/bar/${bar.id}`, { state: { bar } })}
          >
            <CardMedia
              component="img"
              height="140"
              image={bar.image}
              alt={bar.name}
            />
            <CardContent>
              <Typography variant="h6">{bar.name}</Typography>
              <Typography variant="body2">Цена: {bar.price} ₽</Typography>
              <Button 
                startIcon={<DirectionsIcon />}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              >
                Построить маршрут
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default BeerDetailPage; 