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
            borderRadius: '20px', // Apply border radius to the root
            overflow: 'hidden', // Ensure background doesn't overflow
            backgroundColor: 'rgba(242, 221, 207, 0.1)', // Light gray with a hint of the original color
            '& fieldset': {
              borderColor: '#F2DDCF',
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
            color: 'rgba(242, 221, 207, 0.7)', // Slightly more opaque for better visibility
            fontFamily: 'Comfortaa',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F2DDCF', // Keep the focused color the same
            fontFamily: 'Comfortaa',
          },
          '& .MuiOutlinedInput-input': {
            color: '#F2DDCF', // Keep the input text color the same
            fontFamily: 'Comfortaa',
          },
          // Add styles for the placeholder (technically the same as label)
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(242, 221, 207, 0.7)',
            opacity: 1, // Needed for some browsers
          },
        }}
      />
    </div>
  );
};

export default Header;