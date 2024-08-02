import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { Typography, Button, Card, CardMedia, CardContent, Grid, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../geolocationContext';
import { bars } from '../data';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import './BarMap.css';

function BarMap() {
  const [sortedBars, setSortedBars] = useState([]);
  const { location: userLocation, loading } = useGeolocation();
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [clusterBars, setClusterBars] = useState([]);
  const [isClusterDialogOpen, setIsClusterDialogOpen] = useState(false);

  useEffect(() => {
    if (userLocation) {
      const barsWithDistance = bars.map(bar => ({
        ...bar,
        distance: calculateDistance(userLocation, { lat: bar.lat, lng: bar.lng })
      }));
      const sorted = barsWithDistance.sort((a, b) => a.distance - b.distance);
      setSortedBars(sorted);
    }
  }, [userLocation]);

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const openBarDetails = (bar) => {
    navigate(`/bar/${bar.id}`, { state: { bar } });
  };

  const handleClusterClick = (e) => {
    const cluster = e.get('target');
    const clusterBars = cluster.getGeoObjects().map(geoObject => geoObject.properties.get('bar'));
    setClusterBars(clusterBars);
    setIsClusterDialogOpen(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="bar-map-container">
           <Grid container spacing={2} className="view-toggle">
            <Grid item xs={6}>
            <Button
                fullWidth
                sx={{
                  bgcolor: viewMode === 'list' ? '#F2DDCF' : '#0E1621',
                  color: viewMode === 'list' ? '#0E1621' : '#F2DDCF',
                  border: viewMode === 'list' ? '3px solid #F2DDCF' : '1px solid #F2DDCF',
                }}
                onClick={() => setViewMode('list')}
                startIcon={<ListIcon />}
              >
                Списком
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={{
                  bgcolor: viewMode === 'map' ? '#F2DDCF' : '#0E1621',
                  color: viewMode === 'map' ? '#0E1621' : '#F2DDCF',
                  border: viewMode === 'map' ? '3px solid #F2DDCF' : '1px solid #F2DDCF',
                }}
                onClick={() => setViewMode('map')}
                startIcon={<MapIcon />}
              >
                На карте
              </Button>
            </Grid>
          </Grid>

      {viewMode === 'list' && (
        <div className="bars-list">
          {sortedBars.map((bar) => (
            <div key={bar.id} className="bar-item" onClick={() => openBarDetails(bar)}>
              <Card sx={{ maxWidth: 555, bgcolor: 'rgba(242, 221, 207, 0.05)' }}>
                <CardMedia
                  sx={{ height: 170 }}
                  image={bar.image}
                  title={bar.name}
                />
                <CardContent className='cardcontentbar'>
                  <Typography level="title-lg" textColor="#F2DDCF" className='name'>
                    {bar.name}
                  </Typography>
                  <Typography textColor="#F2DDCF" className='description'>
                    До 23.00 ⚫️ м. Павелецкая ⚫️ {bar.distance.toFixed(2)} км
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <YMaps>
          <Map
            defaultState={{ center: [userLocation.lat, userLocation.lng], zoom: 12 }}
            width="100%"
            height="calc(100% - 60px)"
            ref={mapRef}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedBlueClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
              }}
              onClick={handleClusterClick}
            >
              {sortedBars.map((bar) => (
                <Placemark
                  key={bar.id}
                  geometry={[bar.lat, bar.lng]}
                  properties={{
                    hintContent: bar.name,
                    balloonContent: bar.name,
                    bar: bar
                  }}
                  options={{
                    preset: 'islands#blueDotIcon',
                    iconCaption: bar.name,
                    iconColor: '#1E88E5',
                    iconCaptionMaxWidth: '200',
                  }}
                  onClick={() => openBarDetails(bar)}
                />
              ))}
            </Clusterer>
            <Placemark
              geometry={[userLocation.lat, userLocation.lng]}
              options={{
                preset: 'islands#redCircleDotIcon'
              }}
              properties={{
                iconContent: 'Вы здесь'
              }}
            />
          </Map>
        </YMaps>
      )}

      <Dialog open={isClusterDialogOpen} onClose={() => setIsClusterDialogOpen(false)}>
        <DialogTitle>Bars in this area</DialogTitle>
        <DialogContent>
          <List>
            {clusterBars.map((bar) => (
              <ListItem key={bar.id} button onClick={() => {
                openBarDetails(bar);
                setIsClusterDialogOpen(false);
              }}>
                <ListItemText primary={bar.name} secondary={`${bar.distance.toFixed(2)} km away`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BarMap;