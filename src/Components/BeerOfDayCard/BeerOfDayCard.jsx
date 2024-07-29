import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography, Button } from '@mui/material';
import { categories, types, beerTypes, bars, countries } from '../data';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import './BeerOfDayCard.css'

 function BeerOfDayCard() {
  const [currentBeerIndex, setCurrentBeerIndex] = useState(0);
  const beersOfTheDay = beerTypes.slice(0, 3);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const mainTypes = types.slice(0, 4);


const handleSwipe = (direction) => {
  setActiveIndex((prevIndex) => {
    if (direction === 'left') {
      return (prevIndex + 1) % beersOfTheDay.length;
    } else {
      return (prevIndex - 1 + beersOfTheDay.length) % beersOfTheDay.length;
    }
  });
};

const handlers = useSwipeable({
  onSwipedLeft: () => handleSwipe('left'),
  onSwipedRight: () => handleSwipe('right'),
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
  behavior: 'smooth'
});


  return(
  <div className='beerofdaycard'>
  <Box className='base-beer-day'>
  <Typography fontSize={20} fontWeight={550} className="base-title-3">
      Пиво дня
  </Typography>
</Box>
<Box className="beers-of-day-wrapper" {...handlers}>
<Box className="beers-of-day-container">
{beersOfTheDay.map((beer, index) => {
  const position = 
    index === activeIndex ? 'active' : 
    index === (activeIndex - 1 + beersOfTheDay.length) % beersOfTheDay.length ? 'prev' : 'next';

  return (
        <Card 
          key={index} 
          className={`beer-of-day-card ${position}`}
          sx={{ 
            backgroundColor: 'transparent', 
            boxShadow: 'none' 
          }}
        >
      <CardActionArea sx={{ height: '100%' }}>
        <Box className="cardContent">
          <Box className="daycardImageContainer">
            <div className="imageWrapper">
              <CardMedia
                component="img"
                className="cardImage"
                image={beer.image}
                alt="beer image"
              />
            </div>
          </Box>
          <Box className="daycardTextContent">
            <Typography className="cardTitle">
              {beer.label}
            </Typography>
            <Typography className="cardTitleInfo">
              {beer.labelinfo}
            </Typography>
          </Box>
        </Box>   
      </CardActionArea>
    </Card>
  );
})}
</Box>
<Box className="dot-indicators">
{beersOfTheDay.map((_, index) => (
  <span 
    key={index} 
    className={`dot ${index === activeIndex ? 'active' : ''}`}
  />
))}
</Box>
</Box>
</div>

)};

export default BeerOfDayCard;