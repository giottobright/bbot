// Header.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './Header.css';
import { useSearch } from '../SearchContext';
import { useSmartSearch } from '../useSmartSearch';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Header = ({variant = 'default'}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery, setSearchResults } = useSearch();
  const smartSearch = useSmartSearch();

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    const results = smartSearch(newQuery);
    setSearchResults(results);
    if (location.pathname !== '/form') {
      navigate('/form', { state: { searchQuery: newQuery } });
    }
  };

  useEffect(() => {
    if (location.pathname !== '/form') {
      setSearchQuery('');
    }
  }, [location.pathname, setSearchQuery]);

  return (
    <div className={`header ${variant === 'base' ? 'header-base' : ''}`}>
      <TextField
        fullWidth
        id="outlined-search"
        type="search"
        placeholder="Найти..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#F2DDCF' }} />
            </InputAdornment>
          ),
        }}
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