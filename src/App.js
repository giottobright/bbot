import { useEffect } from 'react';
import './App.css';
import {useTelegram} from './hooks/useTelegram';
import Header from './Components/Header/Header';
const {user, onClose} = useTelegram();
const tg = window.Telegram.WebApp;

function App() {
  const {onToggleButton, tg} = useTelegram();


  useEffect(() => {
    tg.ready();
  }, [])



  return (
    <div className="App">
      <Header/>
      <button onClick={onToggleButton}>toogle</button>
    </div>
  );
}

export default App;
