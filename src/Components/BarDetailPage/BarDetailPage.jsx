import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Grid, Card, CardActionArea, CardMedia, Box } from '@mui/material';
import { beerTypes } from '../data';
import './BarDetailPage.css';

function BarDetailPage() {
  const location = useLocation();
  const { bar } = location.state;

  const getBeerDetails = (beerId) => beerTypes.find(beer => beer.id === beerId);

  return (
    <div className="main-screen">
      <Typography variant="h4" className="bar-name">{bar.name}</Typography>
      <Typography variant="h6" className="beers-heading"> Beers:</Typography>
      <Grid container spacing={2} className="category-container">
        {bar.beers.map((beerId) => {
          const beer = getBeerDetails(beerId);
          return (
            <Grid item xs={12} sm={6} md={4} key={beer.id} className="gridcard">
              <Card className="card" sx={{ borderRadius: '12px' }}>
                <CardActionArea 
                  sx={{ backgroundColor: '#F2DDCF', borderRadius: '16px' }}
                >
                  <Box className="cardContent">
                    <Box className="cardImageContainer">
                      <CardMedia
                        component="img"
                        className={`cardImage ${beer.imageType}`}
                        image={beer.image}
                        alt={beer.label}
                      />
                    </Box>
                    <Box className="cardTextContent">
                      <Typography variant="h6" className="cardTitle" fontFamily={'Comfortaa'}>
                        {beer.label}
                      </Typography>
                      <Typography variant="subtitle2" className="cardSubtitle" fontFamily={'Comfortaa'}>
                        {beer.labelinfo}
                      </Typography>
                      <Box className="cardDescriptionContainer">
                        <Typography variant="body2" className="cardDescription" fontFamily={'Comfortaa'}>
                          {beer.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>   
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