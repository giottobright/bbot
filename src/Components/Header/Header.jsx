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
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#F5DECB',
                        },
                        '&:hover fieldset': {
                            borderColor: '#F5DECB',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#F5DECB',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#F5DECB',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#F5DECB',
                    },
                    '& .MuiOutlinedInput-input': {
                        color: '#F5DECB',
                    },
                }}
            />
        </div>
    );
};

export default Header;