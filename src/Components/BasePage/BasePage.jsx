import React, { useState } from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './BasePage.css';
import { categories, types, beerTypes, bars, countries } from '../data';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import logo from '../img/logoBB.png'
import { useSwipeable } from 'react-swipeable';


import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Title } from '@telegram-apps/telegram-ui';


function BasePage() {
    const [currentBeerIndex, setCurrentBeerIndex] = useState(0);
    const beersOfTheDay = beerTypes.slice(0, 3);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const mainTypes = types.slice(0, 4);

  const handleCategoryClick = (id, isType = false) => {
    navigate('/form', { state: { selectedId: id, isType: isType } });
  };

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
    trackMouse: true
  });

  const handleSeeAllClick = () => {
    navigate('/form');
  };

  const visibleBeers = [
    beersOfTheDay[(currentBeerIndex - 1 + beersOfTheDay.length) % beersOfTheDay.length],
    beersOfTheDay[currentBeerIndex],
    beersOfTheDay[(currentBeerIndex + 1) % beersOfTheDay.length],
  ];


  return (
    <div className="base-screen">
        <Box className='base-up'>
            <Box className='base-up-image'>
                <CardMedia
                                    component="img"
                                    className={`logo`}
                                    image={logo}
                                    alt="beer image"
                                />
            </Box>
            <Box className='base-up-text'>
                <Typography fontSize={17} fontWeight={300} className="base-title">
                    Добро пожаловать в GeoBeer!
                </Typography>
            </Box>
        </Box>
        <Box className='base-title-box'>
            <Typography fontSize={25} fontWeight={700} className="base-title-2">
                Выбирай пиво, находи бар!
            </Typography>
        </Box>
      <Header variant="base" className='base-search'/>
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
      


      
      <Box className="category-header">
        <Typography fontSize={20} fontWeight={550} className="category-title">
          Категории
        </Typography>
        <Button 
          variant="outlined" 
          className="see-all-button"
          onClick={handleSeeAllClick}
        >
          Все
        </Button>
      </Box>
      <Grid container spacing={0.5} className="category-container">
        {mainTypes.map((type, index) => (
          <Grid item xs={3} sm={3} md={3} key={index} className='gridcard'>
            <Card className='card'>
              <CardActionArea 
                sx={{ backgroundColor: 'rgba(37, 43, 51, 0.98)' }} 
                onClick={() => handleCategoryClick(type.id, true)}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={type.image}
                  alt="type image"
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По стране
      </Typography>
    </div>
  );
}
export default BasePage;