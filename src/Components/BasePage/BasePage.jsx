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
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Title } from '@telegram-apps/telegram-ui';


function BasePage() {
  const [currentBeerIndex, setCurrentBeerIndex] = useState(0);
  const beersOfTheDay = beerTypes.slice(0, 5);
  const navigate = useNavigate();

  const handleCategoryClick = (id, isType = false) => {
    navigate('/form', { state: { selectedId: id, isType: isType } });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentBeerIndex((prevIndex) => 
        prevIndex === beersOfTheDay.length - 1 ? 0 : prevIndex + 1
      );
    },
    onSwipedRight: () => {
      setCurrentBeerIndex((prevIndex) => 
        prevIndex === 0 ? beersOfTheDay.length - 1 : prevIndex - 1
      );
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

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
        <Box className="beers-of-day-wrapper">
        <Box className="beers-of-day-container" {...handlers}>
        {visibleBeers.map((beer, index) => (
          <Card key={index} className="beer-of-day-card">
            <CardActionArea sx={{ height: '100%', display: 'flex', backgroundColor: 'rgba(37, 43, 51, 0.9)', borderRadius: '12px' }}>
              <Box className="cardContent">
                <Box className="cardImageContainer">
                  <CardMedia
                    component="img"
                    className={`cardImage ${beer.imageType}`}
                    image={beer.image}
                    alt="beer image"
                  />
                </Box>
                <Box className="cardTextContent">
                  <Typography variant="h6" className="cardTitle">
                    {beer.label}
                  </Typography>
                  <Typography variant="body2" className="cardTitleInfo">
                    {beer.labelinfo}
                  </Typography>
                  <Box className="cardDescriptionContainer">
                    <Typography variant="body2" className="cardDescription">
                      {beer.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>   
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box className="dot-indicators">
          {beersOfTheDay.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentBeerIndex ? 'active' : ''}`}
            />
          ))}
        </Box>
      </Box>
      


      
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По типу
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {types.map((type, index) => (
          <Grid item xs={4} sm={4} md={4} key={index} className='gridcard'>
            <Card className='card'>
              <CardActionArea 
                sx={{ backgroundColor: '#F2DDCF' }} 
                onClick={() => handleCategoryClick(type.id, true)}
              >
                <CardMedia
                  component="img"
                  height="130"
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