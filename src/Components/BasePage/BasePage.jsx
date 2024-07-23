import React from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './BasePage.css';
import { categories, types, beerTypes, bars, countries } from '../data';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import logo from '../img/logoBB.png'


import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Title } from '@telegram-apps/telegram-ui';


function BasePage() {
  const navigate = useNavigate();

  const handleCategoryClick = (id, isType = false) => {
    navigate('/form', { state: { selectedId: id, isType: isType } });
  };

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
      <Grid container spacing={0.5} className="base-category-container">
        {categories.map((category, index) => (
          <Grid item xs={4} sm={4} md={4} key={index} className='base-gridcard'>
            <Card className='base-card'>
              <CardActionArea 
                sx={{ backgroundColor: '#323232' }} 
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardMedia
                  component="img"
                  height="130"
                  image={category.image}
                  alt="category image"
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      
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