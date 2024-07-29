import React, { useState } from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './BasePage.css';
import { categories, types, beerTypes, bars, countries } from '../data';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import logo from '../img/logoBB.png'
import { useSwipeable } from 'react-swipeable';
import BeerOfDayCardOne from '../BeerOfDayCardOne/BeerOfDayCardOne';



import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Title } from '@telegram-apps/telegram-ui';
import BeerOfDayCard from '../BeerOfDayCard/BeerOfDayCard';
import CategoryMain from '../CategoryMain/CategoryMain';


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
                <Typography fontSize={15} fontWeight={300} className="base-title">
                    Добро пожаловать в GeoBeer!
                </Typography>
            </Box>
        </Box>
        <Box className='base-title-box'>
            <Typography fontSize={20} fontWeight={700} className="base-title-2">
                Выбирай пиво, находи бар!
            </Typography>
        </Box>
      <Header variant="base" className='base-search'/>
      <BeerOfDayCardOne/>
      <CategoryMain/>
      <Typography fontSize={20} fontWeight={550} className="category-title">
        Все пиво
      </Typography>
    </div>
  );
}
export default BasePage;