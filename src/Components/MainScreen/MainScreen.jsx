import React from 'react'
import { Container, Grid, Card, CardContent, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import './MainScreen.css'

const categories = [
    { label: 'На завтрак', image: 'breakfast.jpg' },
    { label: 'Сытный обед', image: 'lunch.jpg' },
    { label: 'Для уютного вечера', image: 'evening.jpg' },
    { label: 'Хочется сладкого', image: 'sweet.jpg' },
    { label: 'С собой на природу', image: 'nature.jpg' },
    { label: 'Спастись от жары', image: 'heat.jpg' },
    { label: 'На перекус', image: 'snack.jpg' },
    { label: 'Сейчас сезон', image: 'season.jpg' },
    { label: 'Из других стран', image: 'international.jpg' },
  ];

function MainScreen() {
  return (
    <Grid container spacing={2} className="category-container">
    {categories.map((category, index) => (
      <Grid item xs={4} key={index}>
        <Card className="category-card">
          <CardContent>
            <Typography variant="subtitle1">{category.label}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}

export default MainScreen