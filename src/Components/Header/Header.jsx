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
    const { user, onClose } = useTelegram();

    return (
        <div className="header">
        <TextField fullWidth id="outlined-search" label="Найти" type="search" />
            {/* <Button onClick={onClose}>Закрыть</Button> */}
        </div>
    );
};

export default Header;