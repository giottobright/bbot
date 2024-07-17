import { useEffect } from 'react';
import './App.css';
import {useTelegram} from './hooks/useTelegram';
import Header from './Components/Header/Header';
const {user, onClose} = useTelegram();
const tg = window.Telegram.WebApp;
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProductList from './Components/ProductList/ProductList';
import Form from './Components/Form/Form';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import themeDesign from './themeDesign';
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import MainScreen from './Components/MainScreen/MainScreen'
import '@telegram-apps/telegram-ui/dist/styles.css';
import MapPage from './Components/MapPage/MapPage';



function App() {
  const { onToggleButton, tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate(-1);
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate, tg]);



  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<MainScreen />}/>
        <Route path={'productlist'} element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
        <Route path={'mappage'} element={<MapPage />}/>
      </Routes>
    </div>
  );
}

export default App;
