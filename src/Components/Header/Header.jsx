import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';
import { Container, Grid, Card, CardContent, Typography, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@telegram-apps/telegram-ui';


const Header = (props) => {
    return (
        <div className="header">
            <TextField
                fullWidth
                id="outlined-search"
                label="Найти..."
                type="search"
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