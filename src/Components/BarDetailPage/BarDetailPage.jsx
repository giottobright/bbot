import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import './BarDetailPage.css';

function BarDetailPage() {
  const location = useLocation();
  const { bar } = location.state;

  return (
    <div className="bar-detail-page">
      <Typography variant="h4" className="bar-name">{bar.name}</Typography>
      <Typography variant="h6" className="beers-heading">Available Beers:</Typography>
      <List>
        {bar.beers.map((beer, index) => (
          <ListItem key={index}>
            <ListItemText primary={beer} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default BarDetailPage;