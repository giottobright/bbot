import React, { useEffect, useCallback, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import Header from './Components/Header/Header';
import MainScreen from './Components/MainScreen/MainScreen';
import { GeolocationProvider } from './Components/geolocationContext';
import { SearchProvider, useSearch } from './Components/SearchContext';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import BarDetailPage from './Components/BarDetailPage/BarDetailPage';
import BasePage from './Components/BasePage/BasePage';
import BarMap from './Components/BarMap/BarMap';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import BeerDetailPage from './Components/BeerDetailPage/BeerDetailPage';
import { UserProvider } from './context/UserContext';

function AppContent() {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery } = useSearch();
  const [value, setValue] = useState(0);

  const handleBackButton = useCallback(() => {
    if (location.pathname !== '/') {
      setSearchQuery('');
      navigate(-1);
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
    } else if (newValue === 2) {
      navigate('/profile');
    }
  };

  useEffect(() => {
    tg.ready();
    if (tg.initDataUnsafe?.query_id) {
      tg.expand();
    }
  }, [tg]);

  return (
    <Box sx={{ pb: 7 }}>
      <Routes>
        <Route index element={<BasePage />} />
        <Route path="/bars" element={<MainScreen />} />
        <Route path="/bar/:id" element={<BarDetailPage />} />
        <Route path="/map" element={<BarMap />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/beer/:id" element={<BeerDetailPage />} />
      </Routes>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          sx={{
            width: '100%',
            backgroundColor: '#1B1B1B',
            '& .MuiBottomNavigationAction-root': {
              color: '#F2DDCF',
            },
            '& .Mui-selected': {
              color: '#F2DDCF',
            },
          }}
        >
          <BottomNavigationAction label="Главная" icon={<SportsBarIcon />} />
          <BottomNavigationAction label="Бары" icon={<StorefrontIcon />} />
          <BottomNavigationAction label="Профиль" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

function App() {
  return (
    <UserProvider>
      <GeolocationProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </GeolocationProvider>
    </UserProvider>
  );
}

export default App;