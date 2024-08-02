import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardActionArea, CardMedia, Box, IconButton, CardContent, Button } from '@mui/material';
import { beerTypes } from '../data';
import './BarDetailPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function BarDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bar } = location.state;

  const getBeerDetails = (beerId) => beerTypes.find(beer => beer.id === beerId);

  return (
    <div className="bar-detail-page">
      <div className="bar-header">
        <img src={bar.image} alt={bar.name} className="bar-main-image" />
        <div className="bar-header-overlay">
          <div className="top-buttons">
            <Button startIcon={<MapIcon />}  className="map-button" sx={{
              color: '#F2DDCF'
            }}>
              На карте
            </Button>
            <div className="right-buttons">
              <IconButton className="icon-button" sx={{
              color: '#F2DDCF'
            }} >
                <LanguageIcon />
              </IconButton>
              <IconButton className="icon-button" sx={{
              color: '#F2DDCF'
            }}>
                <PhoneIcon />
              </IconButton>
            </div>
          </div>
          <div className="bar-info">
            <IconButton className="back-button" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h4" className="bar-name">{bar.name}</Typography>
              <IconButton className="icon-button favorite-bar-button" sx={{ color: '#F2DDCF', bgcolor: 'rgba(242, 221, 207, 0.1)' }}>
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

      <Typography variant="h6" className="section-title">Доступные сорта пива</Typography>
      <Grid container spacing={2} className="beers-container">
        {bar.beers.map((beerId) => {
          const beer = getBeerDetails(beerId);
          return (
            <Grid item xs={12} sm={12} md={12} key={beer.id}>
              <Card className="beer-card" sx ={{bgcolor: 'rgba(242, 221, 207, 0.1)', color: '#F2DDCF'}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className={`beer-image ${beer.imageType}`}
                    image={beer.image}
                    alt={beer.label}
                  />
                  <CardContent className="beer-content">
                    <Typography variant="h6" className="beer-title">
                      {beer.label}
                    </Typography>
                    <Typography variant="subtitle2" className="beer-info">
                      {beer.labelinfo}
                    </Typography>
                    <Typography variant="body2" className="beer-description">
                      {beer.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default BarDetailPage;