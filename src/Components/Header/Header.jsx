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
            <TextField sx={{ 
                    label: { color: 'var(--tg-theme-text-color)' },
                    input: { color: 'var(--tg-theme-text-color)' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--tg-theme-text-color)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--tg-theme-text-color)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--tg-theme-text-color)',
                        },},
                        '& .MuiInputLabel-root': {
                            color: 'var(--tg-theme-text-color)',
                            '&.Mui-focused': {
                                color: 'var(--tg-theme-text-color)', // Change the label color to white when focused
                            },
                        },
                }} id="outlined-search" label="Search field" type="search" className='searchbar'/>
        </div>
    );
};

export default Header;