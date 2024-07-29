import React from 'react'
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button'; // Add this import
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import beerofday_maximus from '../img/beerofday_maximus.gif';
import './BeerOfDayCardOne.css'
import { useNavigate, useLocation } from 'react-router-dom';

function BeerOfDayCardOne() {

  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/barmap');
  };

    return (
      <div className='cardone'>
        <Card sx={{ height: '200px', margin: '10px 0 0 0', position: 'relative' }} variant="plain" className='cardonee'>
          <CardCover className='cardonecover'>
            <img
              src={beerofday_maximus}
              srcSet={beerofday_maximus}
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            }}
          />
          <CardContent sx={{ justifyContent: 'flex-end', position: 'relative' }}>
            <Typography level="title-lg" textColor="#F2DDCF">
              Lagunitas Maximus
            </Typography>
            <Typography textColor="#F2DDCF">
              7.5%  75 IBU
            </Typography>
            <Button
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                color: '#F2DDCF',
                borderColor: '#F2DDCF',
                '&:hover': {
                  borderColor: '#F2DDCF',
                  backgroundColor: 'rgba(242, 221, 207, 0.1)',
                },
              }}
              onClick={handleMapClick}
            >
              На карте
            </Button>
          </CardContent>
        </Card>
      </div>
    );
}

export default BeerOfDayCardOne