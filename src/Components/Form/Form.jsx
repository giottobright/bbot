import React, { useState, useEffect } from 'react';
import { Card, Grid, CardActionArea, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  { id: 2, name: "Бар у Васи", lat: 55.695011, lng: 37.662614, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 3, name: "Пивной дом", lat: 55.7622200, lng: 37.6155600, beers: ["Атомная Прачечная XX", "Sovngarde"] },
  { id: 4, name: "Jawsspor", lat: 55.695011, lng: 37.662614, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 5, name: "Harats", lat: 55.695011, lng: 37.662614, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 6, name: "Камчатка", lat: 55.695011, lng: 37.662614, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 7, name: "Бамбл Би", lat: 55.695011, lng: 37.662614, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 8, name: "Secret", lat: 55.695011, lng: 37.662614, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
];

const distanceFilters = [
  { value: null, label: 'Все' },
  { value: 1000, label: '10 мин 🚶 - 3 мин 🚖' },
  { value: 3000, label: '30 мин 🚶 - 10 мин 🚖' },
  { value: 15000, label: '30 мин 🚖' },
];

function Form() {
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(distanceFilters[0].value);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      webApp.expand();
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
          setUserLocation({ lat: 55.7558, lng: 37.6173 });
        }
      );
    } else {
      console.log("Геолокация не поддерживается браузером");
      setUserLocation({ lat: 55.7558, lng: 37.6173 });
    }
  }, []);

  const handleBeerSelect = (beerName) => {
    setSelectedBeer(beerName);
    const relevantBars = bars.filter(bar => bar.beers.includes(beerName));
    navigate('/mappage', { state: { beerName, bars: relevantBars } });
  };

  const handleDistanceChange = (value) => {
    setSelectedDistance(value);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Расстояние в км
    return d * 1000; // Переводим в метры
  };

  const filteredBars = userLocation
    ? bars.filter(bar => {
        if (selectedDistance === null) return true; // Показываем все бары, если выбран "Без фильтра"
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          bar.lat, bar.lng
        );
        return distance <= selectedDistance;
      })
    : bars; // Если геолокация не доступна, показываем все бары

  const availableBeers = [...new Set(filteredBars.flatMap(bar => bar.beers))];

  return (
    <div className="main-screen">
      <Box className="distance-filter-buttons">
        {distanceFilters.map((filter) => (
          <Button
            key={filter.value || 'no-filter'}
            onClick={() => handleDistanceChange(filter.value)}
            className={`filter-button ${selectedDistance === filter.value ? 'active' : ''}`}
          >
            {filter.label}
          </Button>
        ))}
      </Box>

      <Typography fontSize={20} fontWeight={550} className="category-title">
        Double IPA
      </Typography>
      <Grid container spacing={0.5} className="category-container">
        {categories
          .filter(category => availableBeers.includes(category.label))
          .map((category, index) => (
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
    </div>
  );
}

export default Form;
