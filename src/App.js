import { useEffect } from 'react';
import './App.css';
import {useTelegram} from './hooks/useTelegram';
import Header from './Components/Header/Header';
const {user, onClose} = useTelegram();
const tg = window.Telegram.WebApp;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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


function App() {

  const theme = useTheme();
  const {onToggleButton, tg} = useTelegram();


  useEffect(() => {
    tg.ready();
  }, [])

  const darkModeTheme = createTheme(themeDesign('dark'));




  return (
  <ThemeProvider theme={darkModeTheme}>
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
