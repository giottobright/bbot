import React from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './MainScreen.css';
import { categories, types, beerTypes, bars, countries } from '../data';
import { Link } from 'react-router-dom';


import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Title } from '@telegram-apps/telegram-ui';


function MainScreen() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate('/form', { state: { selectedCategory: categoryId } });
  };

  return (
    <div className="main-screen">
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По цвету
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories.map((category, index) => (
          <Grid item xs={4} sm={4} md={4} key={index} className='gridcard'>
            <Card className='card'>
              <CardActionArea 
                sx={{ backgroundColor: '#F2DDCF' }} 
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
                onClick={() => handleCategoryClick(type.id)}
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
      <Grid container spacing={0.5} className="category-container">
        {countries.map((country, index) => (
          <Grid  item xs={4} sm={4} md={4} key={index}>
            <Card className='card'>
              <CardActionArea sx={{ backgroundColor: '#F2DDCF' }} onClick={() => handleCategoryClick(category.id)}>
                <CardMedia
                  component="img"
                  height="130"
                  image={country.image}
                  alt="category image"
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default MainScreen;