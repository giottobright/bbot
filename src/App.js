import React, { useEffect, useCallback, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import Header from './Components/Header/Header';
import ProductList from './Components/ProductList/ProductList';
import Form from './Components/Form/Form';
import MainScreen from './Components/MainScreen/MainScreen';
import MapPage from './Components/MapPage/MapPage';
import { GeolocationProvider } from './Components/geolocationContext';
import { SearchProvider, useSearch } from './Components/SearchContext';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import ArchiveIcon from '@mui/icons-material/Archive';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarsPage from '../src/Components/BarsPage/BarsPage';
import BarDetailPage from '../src/Components/BarDetailPage/BarDetailPage';

function AppContent() {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery } = useSearch();
  const [value, setValue] = useState(0);

  const handleBackButton = useCallback(() => {
    if (location.pathname !== '/') {
      setSearchQuery('');  // Очищаем поисковой запрос
      navigate(-1);  // Переходим на предыдущую страницу
    } else {
      tg.close();
    }
  }, [location.pathname, navigate, setSearchQuery, tg]);

  useEffect(() => {
    tg.ready();
    tg.BackButton.onClick(handleBackButton);

    return () => {
      tg.BackButton.offClick(handleBackButton);
    };
  }, [tg, handleBackButton]);

  useEffect(() => {
    if (location.pathname === '/') {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }
  }, [location.pathname, tg.BackButton]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/');
    } else if (newValue === 1) {
      navigate('/bars');
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<MainScreen />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="form" element={<Form />} />
        <Route path="mappage" element={<MapPage />} />
        <Route path="bars" element={<BarsPage />} />
        <Route path="bar/:id" element={<BarDetailPage />} />
      </Routes>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: '12px' }}  elevation={3}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            sx={{ borderRadius: '12px', backgroundColor: 'rgba(61, 26, 23, 0.8)', backdropFilter: 'blur(10px)' }}
          >
          <BottomNavigationAction 
              label="Пиво" 
              icon={<SportsBarIcon />} 
              sx={{ 
                color: value === 0 ? '#FFFFFF' : '#F2DDCF',
                '&.Mui-selected': {
                  color: '#FFFFFF'
                },
                '& .MuiBottomNavigationAction-label': {
                  fontFamily: 'Comfortaa, sans-serif',
                },
              }} 
            />
            <BottomNavigationAction 
              label="Бары" 
              icon={<StorefrontIcon />} 
              sx={{ 
                color: value === 0 ? '#F2DDCF' : '#F2DDCF',
                '&.Mui-selected': {
                  color: '#FFFFFF'
                },
                '& .MuiBottomNavigationAction-label': {
                  fontFamily: 'Comfortaa, sans-serif',
                },
              }} 
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}

function App() {
  return (
    <GeolocationProvider>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </GeolocationProvider>
  );
}

export default App;