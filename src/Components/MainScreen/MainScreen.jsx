import React from 'react';
// import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import './MainScreen.css';
import { Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'; 
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { Grid } from '@mui/material';
import { Title } from '@telegram-apps/telegram-ui';


const categories = [
  { label: 'Светлое', image: 'https://www.homebrewhappyhour.com/wp-content/uploads/2022/01/carbonation-artwork-1536x864.png' },
  { label: 'Темное', image: 'https://media.gettyimages.com/id/1298643776/video/dark-beer-bubbles.jpg?s=640x640&k=20&c=BrEnvc0SQaE2PwZlKx34YvEXLpLZoKYKNpE_FiZxF2A=' },
  { label: 'Сидр', image: 'https://media.cntraveler.com/photos/598088a3b7a86962e8e27c11/16:9/w_1280,c_limit/cider-GettyImages-573622633.jpg' },
];

function MainScreen() {
  return (
    <div className="main-screen">

      <Title
    level="1"
    weight="1"
    className="main-heading"
  >
    По цвету
  </Title>
      <Grid Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="category-container">
        {categories.map((category, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card type="ambient" className="category-card">
            <React.Fragment key=".0">

    <img
      alt="Dog"
      src={category.image}
      style={{
        display: 'block',
        height: 308,
        objectFit: 'cover',
        width: 254
      }}
    />
    <CardCell
      readOnly
    >
      {category.label}
    </CardCell>
  </React.Fragment>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MainScreen;