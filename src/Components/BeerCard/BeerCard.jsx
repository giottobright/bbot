import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';

function BeerCard({ beer, price }) {
    const [showDescription, setShowDescription] = useState(false);
    const navigate = useNavigate();

    const toggleDescription = () => {
        setShowDescription(!showDescription);
      };

  return (
    <Card sx={{ height: '200px', position: 'relative' }} variant="plain">
      <CardCover>
        <img
          src={beer.image}
          srcSet={beer.image}
          loading="lazy"
          alt={beer.name}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end', position: 'relative' }}>
      <Typography 
                    fontSize="12px" 
                    textColor="#F2DDCF" 
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '4px',
                        borderRadius: '4px',
                        marginBottom: '5px',
                    }}
                >
                    {beer.description}
                </Typography>
        <Typography level="title-lg" textColor="#F2DDCF">
          {beer.label}
        </Typography>
        <Typography textColor="#F2DDCF">
        {beer.labelinfo}
        </Typography>
        <Typography
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            color: '#F2DDCF',
            backgroundColor: 'rgba(242, 221, 207, 0.1)',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {price} ₽
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BeerCard;