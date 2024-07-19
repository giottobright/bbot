import React, { useEffect, useCallback } from 'react';
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

function AppContent() {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery } = useSearch();

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

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<MainScreen />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="form" element={<Form />} />
        <Route path="mappage" element={<MapPage />} />
      </Routes>
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