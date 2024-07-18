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
  { label: 'Светлое', image: white },
  { label: 'Темное', image: dark },
  { label: 'Сидр', image: cider },
];

const types = [
  { label: 'Stout', image: stout },
  { label: 'Stout', image: porter },
  { label: 'Stout', image: brownAle },
  { label: 'Stout', image: paleAle },
  { label: 'Stout', image: bitter },
  { label: 'Stout', image: weizen },
  { label: 'Stout', image: mild },
  { label: 'Stout', image: barleyWine },
  { label: 'Stout', image: lightlager },
  { label: 'Stout', image: draft },
  { label: 'Stout', image: raunch },
  { label: 'Stout', image: weizenbier },
  { label: 'Stout', image: lambic },
  { label: 'Stout', image: pilsner },
  { label: 'Stout', image: darklager },
  { label: 'Stout', image: bock }
]

const countries = [
  { label: 'usa', image: usa },
  { label: 'cz', image: cz },
  { label: 'ireland', image: ireland },
]



function MainScreen() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/form');
  };


  return (
    <div className="main-screen">
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По цвету
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories.map((category, index) => (
          <Grid  item xs={4} sm={4} md={4} key={index} className='gridcard'>
            <Card className='card'>
              <CardActionArea sx={{ backgroundColor: '#F2DDCF' }} onClick={handleCardClick}>
                <CardMedia
                  component="img"
                  height="130"
                  image={category.image}
                  alt="category image"
                />
                <CardContent className='cardContent'>
                </CardContent>
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
          <Grid  item xs={4} sm={4} md={4} key={index}>
            <Card className='card'>
              <CardActionArea sx={{ backgroundColor: '#F2DDCF' }}>
                <CardMedia
                  component="img"
                  height="130"
                  image={type.image}
                  alt="category image"
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
              <CardActionArea sx={{ backgroundColor: '#F2DDCF' }}>
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