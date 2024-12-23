import React from 'react';
import { Typography, Avatar, Box, Paper, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <Box className="profile-page">
      <Box className="background-image" />
      <Box className="profile-content">
        <Box className="header-section">
          <Box className="header-actions">
            <IconButton className="action-button">
              <SettingsIcon />
            </IconButton>
          </Box>
          <Avatar
            alt="Dmitrii Kozlov"
            src="/path/to/avatar.jpg"
            className="profile-avatar"
          />
          <Box className="name-location-container">
            <Typography variant="h5" className="profile-name">Dmitrii Kozlov</Typography>
            <Typography variant="subtitle1" className="profile-location">Москва, Россия</Typography>
          </Box>
        </Box>

        <Paper elevation={3} className="profile-details">
          <Box className="profile-stats">
            <Box className="stat-item">
              <Typography variant="h6">66</Typography>
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
      </Box>
    </Box>
  );
};

export default ProfilePage;