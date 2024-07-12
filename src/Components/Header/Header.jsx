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
                            borderColor: '#F6F5EB',
                        },
                        '&:hover fieldset': {
                            borderColor: '#F6F5EB',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#F6F5EB',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#F6F5EB',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#F6F5EB',
                    },
                    '& .MuiOutlinedInput-input': {
                        color: '#F6F5EB',
                    },
                }}
            />
        </div>
    );
};

export default Header;