import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';
import { Container, Grid, Card, CardContent, Typography, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = (props) => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            {/* <Button onClick={onClose}>Закрыть</Button> */}
            <TextField                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--tg-theme-text-color)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--tg-theme-text-color)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--tg-theme-text-color)',
                        },
                        height: '30px', // Set height of the input field
                    },
                    '& .MuiInputBase-input': {
                        height: '30px', // Set height of the input element
                        padding: '0 14px', // Adjust padding
                        color: 'var(--tg-theme-text-color)',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'var(--tg-theme-text-color)',
                        transition: 'transform 0.2s ease-out, font-size 0.2s ease-out',
                        transformOrigin: 'top',
                        '&.Mui-focused': {
                            color: 'var(--tg-theme-text-color)',
                            transform: 'translate(0, -0.1em) scale(0.8)', // Change the label color to white when focused
                        },
                    },
                }} id="outlined-search" label="Search field" type="search" className='searchbar' height='30px'/>
        </div>
    );
};

export default Header;