import React from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './MainScreen.css';
import stout from './img/7-removebg-preview (1).png'
import porter from './img/8-removebg-preview.png'
import brownAle from './img/9-removebg-preview.png'
import paleAle from './img/8-removebg-preview (1).png'
import bitter from './img/11-removebg-preview.png'
import weizen from './img/12-removebg-preview.png'
import mild from './img/13-removebg-preview.png'
import barleyWine from './img/14-removebg-preview.png'
import white from './img/1-removebg-preview.png'
import dark from './img/2-removebg-preview.png'
import cider from './img/3-removebg-preview (1).png'
import ireland from './img/6-removebg-preview.png'
import cz from './img/4-removebg-preview.png'
import usa from './img/5-removebg-preview.png'
import pilsner from './img/10-removebg-preview (1).png'
import darklager from './img/11-removebg-preview (1).png'
import draft from './img/12-removebg-preview (1).png'
import bock from './img/13-removebg-preview (1).png'
import raunch from './img/14-removebg-preview (1).png'
import weizenbier from './img/15-removebg-preview.png'
import lambic from './img/16-removebg-preview.png'
import lightlager from './img/9-removebg-preview (1).png'


import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Title } from '@telegram-apps/telegram-ui';


const categories = [
  { label: 'Светлое', image: white, id: 'light' },
  { label: 'Темное', image: dark, id: 'dark' },
  { label: 'Сидр', image: cider, id: 'cider' },
];

const types = [
  { label: 'Stout', image: stout, id: 'stout' },
  { label: 'Porter', image: porter, id: 'porter' },
  { label: 'Brown Ale', image: brownAle, id: 'brown ale' },
  { label: 'Pale Ale', image: paleAle, id: 'pale ale' },
  { label: 'Bitter', image: bitter, id: 'bitter' },
  { label: 'Weizen', image: weizen, id: 'weizen' },
  { label: 'Mild', image: mild, id: 'mild' },
  { label: 'Barley Wine', image: barleyWine, id: 'barley Wine' },
  { label: 'Light Lager', image: lightlager, id: 'light Lager' },
  { label: 'Draft', image: draft, id: 'draft' },
  { label: 'Rauchbier', image: raunch, id: 'rauchbier' },
  { label: 'Weizenbier', image: weizenbier, id: 'weizenbier' },
  { label: 'Lambic', image: lambic, id: 'lambic' },
  { label: 'Pilsner', image: pilsner, id: 'pilsner' },
  { label: 'Dark Lager', image: darklager, id: 'dark lager' },
  { label: 'Bock', image: bock, id: 'bock' }
];

const countries = [
  { label: 'usa', image: usa },
  { label: 'cz', image: cz },
  { label: 'ireland', image: ireland },
]



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