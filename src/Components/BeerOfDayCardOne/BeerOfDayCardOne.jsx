import React from 'react'
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import beerofday_maximus from '../img/beerofday_maximus.gif';
import './BeerOfDayCardOne.css'


function BeerOfDayCardOne() {
    return (
      <div classname='cardone'>
        <Card sx={{  height: '200px', margin: '10px 0 0 0'}} variant="plain" classname='cardonee'>
          <CardCover classname='cardonecover'>
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
          <CardContent sx={{ justifyContent: 'flex-end' }}>
            <Typography level="title-lg" textColor="#F2DDCF">
              Lagunitas Maximus
            </Typography>
            <Typography
              // startDecorator={<LocationOnRoundedIcon />}
              textColor="#F2DDCF"
            >
              7.5%  75 IBU
            </Typography>
          </CardContent>
        </Card>
      </div>
      );
}

export default BeerOfDayCardOne
