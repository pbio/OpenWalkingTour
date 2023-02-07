import * as React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { Container } from '@mui/system';
import { GET_HOTSPOTS_BY_CITY_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/client';
import distanceBetweenCoordinates from '../lib/distanceBetweenCoordinates';
import { GPSContext } from './ShowCurrentLocation';

interface hotspot {
    city: { name: string },
    coordinates: { lat: number, long: number },
    radius: number,
    name: string,
    description: string,
    id: string,
}

export default function Hotspots({ coords }:any){
    const gpsCoordinates = React.useContext(GPSContext);
    console.log(gpsCoordinates);
    const { data, loading, error } = useQuery(GET_HOTSPOTS_BY_CITY_QUERY, {variables: {cityId: '63daa3c0086bf959ab6bb789'}});
    if (loading) return <div>loading</div>;
    if (error) {
        return <div>error</div>
    }

    return (
        <Container>
            <Grid container spacing={2} >
                { gpsCoordinates?.coords.latitude }
                {data.hotspotsByCity
                    .filter((hotspot: hotspot)=>{ 
                        return (distanceBetweenCoordinates(gpsCoordinates?.coords.latitude, gpsCoordinates?.coords.longitude, hotspot.coordinates.lat, hotspot.coordinates.long) < hotspot.radius)
                    }) //is the user in the radius of this hotspot? 
                    .map((hotspot:hotspot) => //render JSX
                {
                    return (
                        <Grid item 
                            sm={12} md={4} lg={3}
                            key={hotspot.id} 
                            gap="2px">
                            <HotspotCard hotspot={hotspot}></HotspotCard>
                        </Grid>);
                })}
            </Grid>
        </Container>
    )
}

function HotspotCard({hotspot}:{hotspot:hotspot}){
    const playText:any = (text: string) => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        return;
    }
    return (<Card onClick={()=>playText(hotspot.description)}>
                <CardHeader 
                    title={ hotspot.name } 
                    subheader={ hotspot.city?.name } />
                <CardContent>
                    <Typography variant='body2'> { hotspot.description }</Typography>
                    <Typography variant='body2'> { `Latitude: ${hotspot.coordinates.lat}`}</Typography>
                    <Typography variant='body2'>{ `Longitude: ${hotspot.coordinates.long}`}</Typography>
                </CardContent>
                
            </Card>);
}
