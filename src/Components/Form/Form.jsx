import React from 'react';
import './Form.css';
import white from './img/1-removebg-preview.png';
import dark from './img/2-removebg-preview.png';
import cider from './img/3-removebg-preview (1).png';

import { Card, Grid, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  { label: 'Светлое', image: white, description: 'Описание для Светлое' },
  { label: 'Темное', image: dark, description: 'Описание для Темное' },
  { label: 'Сидр', image: cider, description: 'Описание для Сидр' },
];

function Form() {
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
          <Grid item xs={12} sm={12} md={12} key={index} className="gridcard">
            <Card className="card" sx={{ borderRadius: '16px' }}>
              <CardActionArea sx={{ backgroundColor: '#F2DDCF' }} onClick={handleCardClick}>
                <Box className="cardContent">
                  <CardMedia
                    component="img"
                    className="cardImage"
                    image={category.image}
                    alt="category image"
                  />
                  <Box className="cardTextContent">
                    <Typography variant="h6" className="cardTitle">
                      {category.label}
                    </Typography>
                    <Typography variant="body2" className="cardDescription">
                      {category.description}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Form;
