import React, { useState, useEffect } from 'react';
import { Card, Grid, CardActionArea, CardMedia, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { useLocation } from 'react-router-dom';

// Импорты изображений
import diGoroh from './img/diGoroh.png';
import kingJ from './img/kingJ.jpeg';
import atomPrach from './img/atomPrach.jpeg';
import sovngarde from './img/sovngarde.jpeg';
import dark from './img/2-removebg-preview.png';
import cider from './img/3-removebg-preview (1).png';

const categories = [
  { id: 'light', label: 'Светлое', description: 'Светлое пиво характеризуется золотистым цветом и легким, освежающим вкусом. Оно обычно имеет низкое содержание алкоголя и подходит для употребления в теплую погоду.' },
  { id: 'dark', label: 'Темное', description: 'Темное пиво отличается насыщенным цветом от темно-янтарного до почти черного. Оно обладает богатым, сложным вкусом с нотками карамели, шоколада или кофе.' },
  { id: 'cider', label: 'Сидр', description: 'Сидр - это алкогольный напиток, получаемый путем брожения яблочного сока. Он может быть сухим или сладким, с различными фруктовыми нотками.' },
];


const types = [
  { 
    label: 'Stout', 
    id: 'stout',
    description: 'Темное, плотное пиво с насыщенным вкусом и ароматом, часто с нотками кофе и шоколада.'
  },
  { 
    label: 'Porter', 
    id: 'porter',
    description: 'Темное пиво с богатым вкусом, сочетающим в себе солодовую сладость и легкую горечь.'
  },
  { 
    label: 'Brown Ale', 
    id: 'brown ale',
    description: 'Пиво коричневого цвета с мягким, слегка ореховым вкусом и карамельными нотками.'
  },
  { 
    label: 'Pale Ale', 
    id: 'pale ale',
    description: 'Светлое пиво с умеренной горечью и фруктово-цитрусовыми ароматами от хмеля.'
  },
  { 
    label: 'Bitter', 
    id: 'bitter',
    description: 'Английский эль с выраженной хмелевой горечью и сухим послевкусием.'
  },
  { 
    label: 'Weizen', 
    id: 'weizen',
    description: 'Немецкое пшеничное пиво с легким, освежающим вкусом и характерными нотками банана и гвоздики.'
  },
  { 
    label: 'Mild', 
    id: 'mild',
    description: 'Легкое английское пиво с низким содержанием алкоголя и мягким, слегка сладковатым вкусом.'
  },
  { 
    label: 'Barley Wine', 
    id: 'barley Wine',
    description: 'Крепкий эль с интенсивным вкусом, сочетающим сладость солода и алкогольное тепло.'
  },
  { 
    label: 'Light Lager', 
    id: 'light Lager',
    description: 'Легкое, освежающее пиво с низкой калорийностью и мягким, чистым вкусом.'
  },
  { 
    label: 'Draft', 
    id: 'draft',
    description: 'Свежее пиво, подаваемое из кег или бочек, часто более живое и ароматное, чем бутилированное.'
  },
  { 
    label: 'Rauchbier', 
    id: 'rauchbier',
    description: 'Немецкое копченое пиво с характерным дымным ароматом и вкусом.'
  },
  { 
    label: 'Weizenbier', 
    id: 'weizenbier',
    description: 'Немецкое пшеничное пиво с мутноватым видом, фруктовыми ароматами и освежающим вкусом.'
  },
  { 
    label: 'Lambic', 
    id: 'lambic',
    description: 'Бельгийское пиво спонтанного брожения с кислым, часто фруктовым вкусом.'
  },
  { 
    label: 'Pilsner', 
    id: 'pilsner',
    description: 'Светлое лагерное пиво с чистым, освежающим вкусом и заметной хмелевой горечью.'
  },
  { 
    label: 'Dark Lager', 
    id: 'dark lager',
    description: 'Темное пиво с мягким вкусом, сочетающим карамельные и шоколадные ноты.'
  },
  { 
    label: 'Bock', 
    id: 'bock',
    description: 'Крепкий лагер с насыщенным солодовым вкусом и минимальной горечью.'
  }
];


const beerTypes = [
  { label: 'Gorkovskaya Brewery', labelinfo: '7.5%  75 IBU', image: diGoroh, imageType: 'round', description: 'Характерная для стиля горечь, вкус и аромат достигнуты благодаря использованию сортов хмеля CITRA и NORTHERN BREWER', categories: ['light', 'ipa'] },
  { label: 'King JJJuliusss', labelinfo: '8.4%  N/A IBU', image: kingJ, imageType: 'square', description: 'Манго, апельсин и сладкий грейпфрут преобладают в аромате с намеками на ананас и смешанный сок тропических фруктов. Вкус повторяет аромат с сочным ощущением во рту и правильной горечью.', categories: 'light' },
  { label: 'Атомная Прачечная XX', labelinfo: '9%  130 IBU', image: atomPrach, imageType: 'square', description: 'Не двойная прачка. Это «Атомная Прачечная», сваренная в стиле Double IPA: еще больше хмеля, еще мощне солодовая база и карамельный акцент, еще плотнее вкус', categories: 'light' },
  { label: 'Sovngarde', labelinfo: '8%  65 IBU', image: sovngarde, imageType: 'square', description: 'Насыщенный цветочно-цитрусовый аромат грейпфрута и апельсина и крепкий солодовый вкус с нежными тропическими нотками.', categories: 'dark' },
  { label: 'Темное', labelinfo: '7.5%  75 IBU', image: dark, imageType: 'square', description: 'Описание для Темное', category: 'dark' },
  { label: 'Сидр', labelinfo: '7.5%  75 IBU', image: cider, imageType: 'square', description: 'Описание для Сидр', category: 'cider' },
];

const bars = [
  { id: 1, name: "Пивная №1", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 2, name: "Бар у Васи", lat: 55.863865, lng: 37.607182, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 3, name: "Пивной дом", lat: 55.7622200, lng: 37.6155600, beers: ["Атомная Прачечная XX", "Sovngarde"] },
  { id: 4, name: "Jawsspot", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 5, name: "Atom", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 6, name: "Harats", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 7, name: "Pub now", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 8, name: "Osterio Mario", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 9, name: "Бамбли би", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 10, name: "Choose", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
];



const distanceFilters = [
  { value: null, label: 'Все' },
  { value: 1000, label: '10 мин 🚶 - 3 мин 🚖' },
  { value: 3000, label: '30 мин 🚶 - 10 мин 🚖' },
  { value: 15000, label: '30 мин 🚖' },
];

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(distanceFilters[0].value);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      webApp.expand();
    }

    if (location.state && location.state.selectedCategory) {
      setSelectedCategoryId(location.state.selectedCategory);
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
  }, [location]);

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

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId) 
    || types.find(type => type.id === selectedCategoryId) 
    || categories[0];
  
  const filteredBeerTypes = selectedCategoryId
    ? beerTypes.filter(beer => 
        Array.isArray(beer.categories) 
          ? beer.categories.includes(selectedCategoryId)
          : beer.categories === selectedCategoryId)
    : beerTypes;

  const filteredBars = userLocation
    ? bars.filter(bar => {
        if (selectedDistance === null) return true;
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          bar.lat, bar.lng
        );
        return distance <= selectedDistance;
      })
    : bars;

  const availableBeers = [...new Set(filteredBars.flatMap(bar => bar.beers))];

  return (
    <div className="main-screen">
      <Box className="category-description">
        <Typography variant="h6" className="category-title">
          {selectedCategory.label}
        </Typography>
        <Typography variant="body2" className="category-text">
          {selectedCategory.description}
        </Typography>
      </Box>

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

      <Grid container spacing={0.5} className="category-container">
        {filteredBeerTypes
          .filter(beer => availableBeers.includes(beer.label))
          .map((beer, index) => (
          <Grid item xs={12} sm={12} md={12} key={index} className="gridcard">
            <Card className="card" sx={{ borderRadius: '12px' }}>
              <CardActionArea 
                sx={{ backgroundColor: '#F2DDCF', borderRadius: '16px' }} 
                onClick={() => handleBeerSelect(beer.label)}
              >
               <Box className="cardContent">
                  <Box className="cardImageContainer">
                    <CardMedia
                      component="img"
                      className={`cardImage ${beer.imageType}`}
                      image={beer.image}
                      alt="beer image"
                    />
                  </Box>
                  <Box className="cardTextContent">
                    <Typography variant="h6" className="cardTitle" fontFamily={'Comfortaa'}>
                      {beer.label}
                    </Typography>
                    <Typography variant="h10" className="cardTitleInfo" fontFamily={'Comfortaa'}>
                      {beer.labelinfo}
                    </Typography>
                    <Box className="cardDescriptionContainer">
                      <Typography variant="body3" className="cardDescription" fontFamily={'Comfortaa'}>
                        {beer.description}
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
