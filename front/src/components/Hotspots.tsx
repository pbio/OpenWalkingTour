import * as React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography, Button, ButtonGroup, Paper, FormControlLabel, Switch } from '@mui/material';
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

export default function Hotspots({ selectedCityId }:{selectedCityId:string}){
    //state
    const [ text, setText ] = React.useState<string>('');
    const [ isRespectRadiusOff, setIsRespectRadiusOff ] = React.useState<boolean>(false);
    //get context
    const gpsCoordinates = React.useContext(GPSContext);
    const { data, loading, error } = useQuery(GET_HOTSPOTS_BY_CITY_QUERY, {variables: { cityId: '63daa3c0086bf959ab6bb789' }});
    
    if (loading) return <div>loading</div>;
    if (error) {
        return <div>error</div>
    }
    const synth = window.speechSynthesis;
    // React.useEffect(() => {
    //     console.log(text);
    //     speechText.text = text;
    //     window.speechSynthesis.speak(speechText);
    // })
    function playDescription(text:string){
        const speechText = new SpeechSynthesisUtterance();
        speechText.text = text;
        synth.speak(speechText);
    }
    function pauseDescription(){
        synth.pause();
    }
    function resumeDescription(){
        synth.resume();
    }
    function stopDescription(){
        synth.cancel();
    }

    return (
        <Container>
            <Grid container spacing={2} >
                {data.hotspotsByCity
                    .filter((hotspot: hotspot) => { //is the user in the radius of this hotspot? 
                        if (isRespectRadiusOff) return true;
                        return (distanceBetweenCoordinates(gpsCoordinates?.coords.latitude, gpsCoordinates?.coords.longitude, hotspot.coordinates.lat, hotspot.coordinates.long) < hotspot.radius)
                    }) 
                    .map((hotspot:hotspot) => { //render JSX
                        return (
                            <Grid item 
                                sm={12} md={4} lg={3}
                                key={hotspot.id} 
                                gap="2px" >
                                <HotspotCard hotspot={ hotspot } setText = { playDescription } />
                            </Grid>);
                    })
                }
            </Grid>
            <Typography>Settings</Typography>
            <ButtonGroup>
                <FormControlLabel 
                    control={
                        <Switch 
                            checked={isRespectRadiusOff} 
                            onChange={ () => setIsRespectRadiusOff(!isRespectRadiusOff) }/>} 
                    label="Is Radius Respected" />
                <Button onClick={ () => pauseDescription() }> Pause </Button>
                <Button onClick={ () => resumeDescription() }> Resume </Button>
                <Button onClick={ () => stopDescription() }> Stop </Button>
                </ButtonGroup>
        </Container>
    )
}

function HotspotCard({hotspot, setText}:{hotspot:hotspot, setText:any}){
    // const playText:any = (text: string) => {
    //     const msg = new SpeechSynthesisUtterance();
    //     msg.text = text;
    //     window.speechSynthesis.speak(msg);
    //     return;
    // }
    return (<Card onClick={()=>setText(hotspot.description)}>
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
