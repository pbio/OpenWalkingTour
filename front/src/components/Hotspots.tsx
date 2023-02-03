import * as React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { Container } from '@mui/system';
import { GET_HOTSPOTS_BY_CITY_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/client';


export default function Hotspots(){
    const { data, loading, error } = useQuery(GET_HOTSPOTS_BY_CITY_QUERY, {variables: {cityId: '63daa3c0086bf959ab6bb789'}});
    if (loading) return <div>loading</div>;
    if (error) {
        return <div>error</div>
        console.log(error)
    }

    return (
        <Container>
            <Grid container spacing={2} >
                {data.hotspotsByCity.map((hotspot:any) =>
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

function HotspotCard({hotspot}:any){
    const playText:any = (text: string) => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        return true;
    }
    return (<Card onClick={()=>playText(hotspot.description)}>
                <CardHeader 
                    title={ hotspot.name } 
                    subheader={ hotspot.city?.name } />
                <CardContent>
                    <Typography variant='body2'> { hotspot.description }</Typography>
                    <Typography variant='body2'> { `Latitude: ${hotspot.coordinates.lat}`}</Typography>
                    <Typography variant='body2'>{ `Longitude: ${hotspot.coordinates.lat}`}</Typography>
                </CardContent>
                
            </Card>);
}
