import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography, Button, Grid } from '@mui/material';
import { categories, types, beerTypes, bars, countries } from '../data';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import './CategoryMain.css'

function CategoryMain() {
    const [currentBeerIndex, setCurrentBeerIndex] = useState(0);
    const beersOfTheDay = beerTypes.slice(0, 3);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const mainTypes = types.slice(0, 4);

    const handleSeeAllClick = () => {
        navigate('/form');
      };

return (
    <div>
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
    </div>
)
};

export default CategoryMain;