import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, Button, CircularProgress } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './MapPage.css';
import { useGeolocation } from '../geolocationContext';

function MapPage() {
    const location = useLocation();
    const [selectedBarIndex, setSelectedBarIndex] = useState(0);
    const { location: userLocation, loading, error } = useGeolocation();
    const { bars: initialBars } = location.state || { bars: [] };
    const [sortedBars, setSortedBars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const mapRef = useRef(null);
    const selectedBarRef = useRef(null);

    useEffect(() => {
        if (location.state) {
            const { bars: initialBars } = location.state;
            console.log('Received bars:', initialBars);
            setIsLoading(false);
        } else {
            console.error('No state received in MapPage');
            setIsLoading(false);
        }
    }, [location.state]);

    useEffect(() => {
        if (userLocation && initialBars.length > 0) {
            const barsWithDistance = initialBars.map(bar => ({
                ...bar,
                distance: calculateDistance(userLocation, { lat: bar.lat, lng: bar.lng })
            }));
            const sorted = barsWithDistance.sort((a, b) => a.distance - b.distance);
            setSortedBars(sorted);
        }
    }, [userLocation, initialBars]);

    useEffect(() => {
        if (mapRef.current && sortedBars.length > 0) {
            const selectedBar = sortedBars[selectedBarIndex];
            mapRef.current.setCenter([selectedBar.lat, selectedBar.lng], 15);
        }
    }, [selectedBarIndex, sortedBars]);

    useEffect(() => {
        if (selectedBarRef.current) {
            selectedBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedBarIndex]);

    const calculateDistance = (point1, point2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (point2.lat - point1.lat) * Math.PI / 180;
        const dLon = (point2.lng - point1.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const handleScroll = (event) => {
        const container = event.target;
        const scrollPosition = container.scrollTop;
        const itemHeight = container.scrollHeight / sortedBars.length;
        const newIndex = Math.round(scrollPosition / itemHeight);
        if (newIndex !== selectedBarIndex && newIndex >= 0 && newIndex < sortedBars.length) {
            setSelectedBarIndex(newIndex);
        }
    };

    const openBarDetails = (bar) => {
        navigate(`/bar/${bar.id}`, { state: { bar } });
    };

    if (loading || isLoading) {
        return <CircularProgress />;
    }

    if (sortedBars.length === 0) {
        return (
            <div className="beer-map-page">
                <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
                    No bars found in this area.
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
                            height="400px"
                            instanceRef={mapRef}
                        >
                            {sortedBars.map((bar, index) => (
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
                    {sortedBars.map((bar, index) => (
                        <Card
                            key={bar.id}
                            ref={index === selectedBarIndex ? selectedBarRef : null}
                            className={`bar-card ${index === selectedBarIndex ? 'selected' : ''}`}
                            onClick={() => openBarDetails(bar)}
                        >
                            <CardActionArea>
                                <Box p={2} className="card-content">
                                    <div className="text-content">
                                        <Typography variant="h6">{bar.name}</Typography>
                                        <Typography variant="body2">{bar.distance.toFixed(2)} km away</Typography>
                                    </div>
                                    <Button 
                                        variant="contained"
                                        className="card-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedBarIndex(index);
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