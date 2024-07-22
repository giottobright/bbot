import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, Button, CircularProgress } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './MapPage.css';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../geolocationContext';

function MapPage() {
    const location = useLocation();
    const [selectedBarIndex, setSelectedBarIndex] = useState(0);
    const { location: userLocation, loading, error } = useGeolocation();
    const { beerName, bars: initialBars } = location.state || { beerName: '', bars: [] };
    const [bars, setBars] = useState(initialBars);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const mapRef = useRef(null);
    const selectedBarRef = useRef(null);

    useEffect(() => {
        if (location.state) {
            const { beerName, bars: initialBars } = location.state;
            console.log('Received beer name:', beerName);
            console.log('Received bars:', initialBars);
            setBars(initialBars || []);
            setIsLoading(false);
        } else {
            console.error('No state received in MapPage');
            setIsLoading(false);
        }
    }, [location.state]);

    useEffect(() => {
        if (mapRef.current && bars.length > 0) {
            const selectedBar = bars[selectedBarIndex];
            mapRef.current.setCenter([selectedBar.lat, selectedBar.lng], 15);
        }
    }, [selectedBarIndex, bars]);

    useEffect(() => {
        if (selectedBarRef.current) {
            selectedBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedBarIndex]);

    const handleScroll = (event) => {
        const container = event.target;
        const scrollPosition = container.scrollTop;
        const itemHeight = container.scrollHeight / bars.length;
        const newIndex = Math.round(scrollPosition / itemHeight);
        if (newIndex !== selectedBarIndex && newIndex >= 0 && newIndex < bars.length) {
            setSelectedBarIndex(newIndex);
        }
    };

    const openYandexMaps = (bar) => {
        const url = `https://yandex.ru/maps/?rtext=${userLocation.lat},${userLocation.lng}~${bar.lat},${bar.lng}&rtt=auto`;
        window.open(url, '_blank');
    };

    if (loading || isLoading) {
        return <CircularProgress />;
    }

    if (bars.length === 0) {
        return (
            <div className="beer-map-page">
                <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
                    No bars found serving this beer.
                </Typography>
            </div>
        );
    }

    return (
        <div className="beer-map-page">
            <div className="map-container">
                {userLocation && (
                    <YMaps>
                        <Map
                            defaultState={{
                                center: [userLocation.lat, userLocation.lng],
                                zoom: 13
                            }}
                            width="100%"
                            height="300px"
                            instanceRef={mapRef}
                        >
                            {bars.map((bar, index) => (
                                <Placemark
                                    key={bar.id}
                                    geometry={[bar.lat, bar.lng]}
                                    options={{
                                        iconColor: index === selectedBarIndex ? '#FF0000' : '#000000',
                                    }}
                                />
                            ))}
                        </Map>
                    </YMaps>
                )}
            </div>
            <div className="bars-list-container">
                <div className="scroll-indicator">
                    <ArrowDownwardIcon />
                    <Typography variant="caption">Scroll</Typography>
                </div>
                <div className="bars-list" onScroll={handleScroll}>
                    {bars.map((bar, index) => (
                        <Card
                            key={bar.id}
                            ref={index === selectedBarIndex ? selectedBarRef : null}
                            className={`bar-card ${index === selectedBarIndex ? 'selected' : ''}`}
                        >
                            <CardActionArea>
                                <Box p={2} className="card-content">
                                    <div className="text-content">
                                        <Typography variant="h6">{bar.name}</Typography>
                                        <Typography variant="body2">{beerName}</Typography>
                                    </div>
                                    <Button 
                                        variant="contained"
                                        className="card-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openYandexMaps(bar);
                                        }}
                                    >🗺</Button>
                                </Box>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MapPage;