import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';

const Header = (props) => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            {/* <Button onClick={onClose}>Закрыть</Button> */}
            <span className={'username'}>
                {user?.username}
            </span>
            <TextField            sx={{ 
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
                            color: 'var(--tg-theme-bg-color)',
                            '&.Mui-focused': {
                                color: 'var(--tg-theme-text-color)', // Change the label color to white when focused
                            },
                        },
                }}  fullWidth id="outlined-search" label="Search field" type="search" className='searchbar'/>
        </div>
    );
};

export default Header;