import React from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography, Button } from '@mui/material';

const BeerOfDayCard = ({ beer, onClick }) => (
  <Card className="beer-of-day-card">
    <CardActionArea sx={{ height: '100%', display: 'flex', backgroundColor: 'rgba(37, 43, 51, 0.9)', borderRadius: '12px' }} onClick={onClick}>
      <Box className="cardContent">
        <Box className="daycardImageContainer">
          <CardMedia
            component="img"
            className={`cardImage ${beer.imageType}`}
            image={beer.image}
            alt="beer image"
          />
        </Box>
        <Box className="daycardTextContent">
          <Box>
            <Typography className="cardTitle">
              {beer.label}
            </Typography>
            <Typography className="cardTitleInfo">
              {beer.labelinfo}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" className="goButton">
            Go
          </Button>
        </Box>
      </Box>   
    </CardActionArea>
  </Card>
);

export default BeerOfDayCard;