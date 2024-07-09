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


function App() {
  const {onToggleButton, tg} = useTelegram();


  useEffect(() => {
    tg.ready();
  }, [])



  return (
    
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
