import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './Header.css';
import { useSearch } from '../SearchContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    if (location.pathname !== '/form') {
        navigate('/form', {state: {searchQuery: newQuery}});
    }
  };

  useEffect(() => {
    if (location.pathname !== '/form') {
        setSearchQuery('');
    }
  }, [location.pathname, setSearchQuery])

  return (
    <div className="header">
      <TextField
        fullWidth
        id="outlined-search"
        label="Найти..."
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        fontFamily={'Comfortaa'}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#F2DDCF',
              borderRadius: '20px',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#F2DDCF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F2DDCF',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#F2DDCF',
            fontFamily: 'Comfortaa',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F2DDCF',
            fontFamily: 'Comfortaa',
          },
          '& .MuiOutlinedInput-input': {
            color: '#F2DDCF',
            fontFamily: 'Comfortaa',
          },
        }}
      />
    </div>
  );
};

export default Header;
