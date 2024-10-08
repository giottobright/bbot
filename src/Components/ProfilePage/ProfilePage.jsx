import React from 'react';
import { Typography, Avatar, Box, Paper, IconButton, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <Box className="profile-page">
      <Box className="background-image" />
      <Box className="profile-content">
        <Box className="header-actions">
          <IconButton className="action-button">
            <SettingsIcon />
          </IconButton>
        </Box>
        <Avatar
          alt="Christian Slater"
          src="/path/to/avatar.jpg"
          className="profile-avatar"
        />
        <Box className="name-location-container">
          <Typography variant="h5" className="profile-name">Dmitrii Kozlov</Typography>
          <Typography variant="subtitle1" className="profile-location">Москва, Россия</Typography>
        </Box>
        
        <Paper elevation={3} className="profile-details">
          <Box className="profile-stats">
            <Box className="stat-item">
              <Typography variant="h6">58</Typography>
              <Typography variant="body2">Пива</Typography>
            </Box>
            <Box className="stat-item">
              <Typography variant="h6">9</Typography>
              <Typography variant="body2">Баров</Typography>
            </Box>
            <Box className="stat-item">
              <Typography variant="h6">15</Typography>
              <Typography variant="body2">Отзывов</Typography>
            </Box>
          </Box>
        </Paper>

        <Box className="activities-container">
          <Typography variant="h6" className="section-title">Активности</Typography>
          <List className="activities-list">
            <ListItem className="activity-item">
              <ListItemText 
                primary="Double IPA Maximus добавлено в избранное" 
                secondary="Jaws Москва • 19/08/2024" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemText 
                primary="Написан отзыв о Chocolate Milk IPA" 
                secondary="Harats Pub Москва • 15/08/2024" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemText 
                primary="Бар Стрелка добавлен в Избранное" 
                secondary="Открытие Москва • 17/08/2024" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemText 
                primary="Бар Онегин добавлен в Избранное" 
                secondary="Рюмочная Azor Москва • 25/08/2024" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemText 
                primary="Написан отзыв о Corona Extra" 
                secondary="Визави Паб Москва • 15/08/2024" 
              />
            </ListItem>
            <ListItem className="activity-item">
              <ListItemText 
                primary="IPA Citrus добавлено в избранное" 
                secondary="Рюмочная Довлатов Москва • 19/08/2024" 
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;