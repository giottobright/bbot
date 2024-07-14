import React, { useState, useEffect } from 'react';
import { Card, Grid, CardActionArea, CardMedia, Typography, Box, Modal } from '@mui/material';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './Form.css';

// Импорты изображений
import diGoroh from './img/diGoroh.png';
import kingJ from './img/kingJ.jpeg';
import atomPrach from './img/atomPrach.jpeg';
import sovngarde from './img/sovngarde.jpeg';
import dark from './img/2-removebg-preview.png';
import cider from './img/3-removebg-preview (1).png';

const categories = [
  { label: 'Gorkovskaya Brewery', labelinfo: '7.5%  75 IBU', image: diGoroh, imageType: 'round', description: 'Характерная для стиля горечь, вкус и аромат достигнуты благодаря использованию сортов хмеля CITRA и NORTHERN BREWER' },
  { label: 'King JJJuliusss', labelinfo: '8.4%  N/A IBU', image: kingJ, imageType: 'square', description: 'Манго, апельсин и сладкий грейпфрут преобладают в аромате с намеками на ананас и смешанный сок тропических фруктов. Вкус повторяет аромат с сочным ощущением во рту и правильной горечью.' },
  { label: 'Атомная Прачечная XX', labelinfo: '9%  130 IBU', image: atomPrach, imageType: 'square', description: 'Не двойная прачка. Это «Атомная Прачечная», сваренная в стиле Double IPA: еще больше хмеля, еще мощне солодовая база и карамельный акцент, еще плотнее вкус' },
  { label: 'Sovngarde', labelinfo: '8%  65 IBU', image: sovngarde, imageType: 'square', description: 'Насыщенный цветочно-цитрусовый аромат грейпфрута и апельсина и крепкий солодовый вкус с нежными тропическими нотками.' },
  { label: 'Темное', labelinfo: '7.5%  75 IBU', image: dark, imageType: 'square', description: 'Описание для Темное' },
  { label: 'Сидр', labelinfo: '7.5%  75 IBU', image: cider, imageType: 'square', description: 'Описание для Сидр' },
];

const bars = [
  { id: 1, name: "Пивная №1", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 2, name: "Бар у Васи", lat: 55.863865, lng: 37.607182, beers: ["King JJJuliusss","Gorkovskaya Brewery", "Сидр"] },
  { id: 3, name: "Пивной дом", lat: 55.7622200, lng: 37.6155600, beers: ["Атомная Прачечная XX", "Sovngarde"] },
];

function BeerMapComponent() {
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      webApp.expand();
    }
  }, []);

  const handleBeerSelect = (beerName) => {
    setSelectedBeer(beerName);
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
    setSelectedBeer(null);
  };

  const relevantBars = bars.filter(bar => bar.beers.includes(selectedBeer));

  return (
    <div className="main-screen">
      <Typography fontSize={20} fontWeight={550} className="category-title">
        Double IPA
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories.map((category, index) => (
          <Grid item xs={12} sm={12} md={12} key={index} className="gridcard">
            <Card className="card" sx={{ borderRadius: '12px' }}>
              <CardActionArea 
                sx={{ backgroundColor: '#F2DDCF', borderRadius: '16px' }} 
                onClick={() => handleBeerSelect(category.label)}
              >
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
      <Modal
        open={isMapOpen}
        onClose={handleCloseMap}
        aria-labelledby="map-modal-title"
        aria-describedby="map-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="map-modal-title" variant="h6" component="h2" gutterBottom>
            Где найти: {selectedBeer}
          </Typography>
          {relevantBars.length > 0 ? (
            <YMaps>
              <Map 
                defaultState={{ 
                  center: [relevantBars[0].lat, relevantBars[0].lng], 
                  zoom: 10 
                }} 
                width="100%" 
                height="90%"
              >
                {relevantBars.map((bar) => (
                  <Placemark
                    key={bar.id}
                    geometry={[bar.lat, bar.lng]}
                    properties={{
                      balloonContentHeader: bar.name,
                      balloonContentBody: `Здесь можно найти: ${selectedBeer}`,
                    }}
                  />
                ))}
              </Map>
            </YMaps>
          ) : (
            <Typography>Нет баров, где можно найти это пиво.</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default BeerMapComponent;