import React from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './MainScreen.css';
import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';


import { Title } from '@telegram-apps/telegram-ui';


const categories = [
  { label: 'Светлое', image: 'https://www.homebrewhappyhour.com/wp-content/uploads/2022/01/carbonation-artwork-1536x864.png' },
  { label: 'Темное', image: 'https://media.gettyimages.com/id/1298643776/video/dark-beer-bubbles.jpg?s=640x640&k=20&c=BrEnvc0SQaE2PwZlKx34YvEXLpLZoKYKNpE_FiZxF2A=' },
  { label: 'Сидр', image: 'https://media.cntraveler.com/photos/598088a3b7a86962e8e27c11/16:9/w_1280,c_limit/cider-GettyImages-573622633.jpg' },
];

function MainScreen() {
  return (
    <div className="main-screen">
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По цвету
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories.map((category, index) => (
          <Grid  item xs={4} sm={4} md={4} key={index}>
            <Card className='card'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="130"
                  image={category.image}
                  alt="category image"
                />
                <CardContent className='cardContent'>
                  <div className="overlay">
                    <Typography fontSize={15} className='cardText'>
                      {category.label}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По цвету
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories.map((category, index) => (
          <Grid  item xs={4} sm={4} md={4} key={index}>
            <Card className='card'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="130"
                  image={category.image}
                  alt="category image"
                />
                <CardContent className='cardContent'>
                  <div className="overlay">
                    <Typography fontSize={15} className='cardText'>
                      {category.label}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography fontSize={20} fontWeight={550} className="category-title">
        По цвету
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories.map((category, index) => (
          <Grid  item xs={4} sm={4} md={4} key={index}>
            <Card className='card'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="130"
                  image={category.image}
                  alt="category image"
                />
                <CardContent className='cardContent'>
                  <div className="overlay">
                    <Typography fontSize={15} className='cardText'>
                      {category.label}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default MainScreen;