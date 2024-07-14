import React from 'react';
import './Form.css';
import diGoroh from './img/diGoroh.png';
import kingJ from './img/kingJ.jpeg';
import atomPrach from './img/atomPrach.jpeg';
import sovngarde from './img/sovngarde.jpeg';
import dark from './img/2-removebg-preview.png';
import cider from './img/3-removebg-preview (1).png';

import { Card, Grid, CardActionArea, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const categories = [
    { label: 'Gorkovskaya Brewery', labelinfo: '7.5%  75 IBU', image: diGoroh, imageType: 'round', description: 'Характерная для стиля горечь, вкус и аромат достигнуты благодаря использованию сортов хмеля CITRA и NORTHERN BREWER' },
    { label: 'King JJJuliusss', labelinfo: '8.4%  N/A IBU', image: kingJ, imageType: 'square', description: 'Манго, апельсин и сладкий грейпфрут преобладают в аромате с намеками на ананас и смешанный сок тропических фруктов. Вкус повторяет аромат с сочным ощущением во рту и правильной горечью.' },
    { label: 'Атомная Прачечная XX', labelinfo: '9%  130 IBU', image: atomPrach, imageType: 'square', description: 'Не двойная прачка. Это «Атомная Прачечная», сваренная в стиле Double IPA: еще больше хмеля, еще мощне солодовая база и карамельный акцент, еще плотнее вкус' },
    { label: 'Sovngarde', labelinfo: '8%  65 IBU', image: sovngarde, imageType: 'square', description: 'Насыщенный цветочно-цитрусовый аромат грейпфрута и апельсина и крепкий солодовый вкус с нежными тропическими нотками.' },
    { label: 'King JJJuliusss', labelinfo: '8.4%  N/A IBU', image: kingJ, imageType: 'square', description: 'Манго, апельсин и сладкий грейпфрут преобладают в аромате с намеками на ананас и смешанный сок тропических фруктов. Вкус повторяет аромат с сочным ощущением во рту и правильной горечью.' },
    { label: 'Gorkovskaya Brewery', labelinfo: '7.5%  75 IBU', image: diGoroh, imageType: 'round', description: 'Характерная для стиля горечь, вкус и аромат достигнуты благодаря использованию сортов хмеля CITRA и NORTHERN BREWER' },
    { label: 'King JJJuliusss', labelinfo: '7.5%  75 IBU', image: kingJ, imageType: 'square', description: 'Описание для Темное' },
    { label: 'King JJJuliusss', labelinfo: '7.5%  75 IBU', image: kingJ, imageType: 'square', description: 'Описание для Темное' },
    { label: 'King JJJuliusss', labelinfo: '7.5%  75 IBU', image: kingJ, imageType: 'square', description: 'Описание для Темное' },
    { label: 'King JJJuliusss', labelinfo: '7.5%  75 IBU', image: kingJ, imageType: 'square', description: 'Описание для Темное' },

  ];

  function Form() {
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate('/form');
    };
  
    return (
      <div className="main-screen">
        <Typography fontSize={20} fontWeight={550} className="category-title">
          Double IPA
        </Typography>
        <Grid container spacing={0.5} className="category-container">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={12} md={12} key={index} className="gridcard">
              <Card className="card" sx={{ borderRadius: '12px' }}>
                <CardActionArea sx={{ backgroundColor: '#F2DDCF', borderRadius: '16px' }} onClick={handleCardClick}>
                  <Box className="cardContent">
                    <Box className="cardImageContainer">
                      <CardMedia
                        component="img"
                        className={`cardImage ${category.imageType}`}
                        image={category.image}
                        alt="category image"
                      />
                    </Box>
                    <Box className="cardTextContent">
                      <Typography variant="h6" className="cardTitle" fontFamily={'Comfortaa'}>
                        {category.label}
                      </Typography>
                      <Typography variant="h10" className="cardTitleInfo" fontFamily={'Comfortaa'}>
                        {category.labelinfo}
                      </Typography>
                      <Box className="cardDescriptionContainer">
                        <Typography variant="body3" className="cardDescription" fontFamily={'Comfortaa'}>
                          {category.description}
                        </Typography>
                      </Box>
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
