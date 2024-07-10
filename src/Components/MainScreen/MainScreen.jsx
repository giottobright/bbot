import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './MainScreen.css';

const categories = [
  { label: 'Светлое', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgk8troztGKvW7YaVIcWw1I9WrqEdbFTYeqQ&s' },
  { label: 'Темное', image: 'https://media.gettyimages.com/id/1298643776/video/dark-beer-bubbles.jpg?s=640x640&k=20&c=BrEnvc0SQaE2PwZlKx34YvEXLpLZoKYKNpE_FiZxF2A=' },
  { label: 'Сидр', image: 'https://media.cntraveler.com/photos/598088a3b7a86962e8e27c11/16:9/w_1280,c_limit/cider-GettyImages-573622633.jpg' },
];

function MainScreen() {
  return (
    <div className="main-screen">
      <h1 className="main-heading">По цвету</h1>
      <Grid container spacing={2} className="category-container">
        {categories.map((category, index) => (
          <Grid item xs={4} key={index}>
            <Card className="category-card">
              <div className="image-container">
                <img src={category.image} alt={category.label} />
                <CardContent className="overlay-content">
                  <Typography variant="subtitle1">{category.label}</Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MainScreen;