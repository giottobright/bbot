import React from 'react';
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';
import TextField from '@mui/material/TextField';

const Header = (props) => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            {/* <Button onClick={onClose}>Закрыть</Button> */}
            <span className={'username'}>
                {user?.username}
            </span>
            <TextField fullWidth id="outlined-search" label="Search field" type="search" className='searchbar'/>
        </div>
    );
};

export default Header;