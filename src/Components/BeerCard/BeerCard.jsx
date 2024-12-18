import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/joy/IconButton';

function BeerCard({ beer, price }) {
    const [showDescription, setShowDescription] = useState(false);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
      navigate(`/beer/${beer.id}`, { state: { beer } });
    };

    const toggleFavorite = (event) => {
        event.stopPropagation();
        setIsFavorite(!isFavorite);
        // Here you would typically update the favorite status in your backend or local storage
      };

  return (
    <Card onClick={handleClick} sx={{ height: '200px', position: 'relative' }} variant="plain">
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
      <IconButton
        onClick={toggleFavorite}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 2,
          backgroundColor: 'rgba(242, 221, 207, 0.35)',
          '&:hover': {
            backgroundColor: 'rgba(242, 221, 207, 0.3)',
          },
        }}
      >
        {isFavorite ? <FavoriteIcon sx={{ color: '#F2DDCF' }} /> : <FavoriteBorderIcon sx={{ color: '#F2DDCF' }} />}
      </IconButton>
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
            backgroundColor: 'rgba(242, 221, 207, 0.35)',
            padding: '4px 8px',
            borderRadius: '4px',
            marginRight: '-15px',
          }}
        >
          {price} ₽
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BeerCard;