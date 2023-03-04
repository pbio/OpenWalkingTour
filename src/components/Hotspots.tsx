import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  ButtonGroup,
  Paper,
  FormControlLabel,
  Switch,
  IconButton,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StopIcon from "@mui/icons-material/Stop";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MapIcon from "@mui/icons-material/Map";
import ListIcon from "@mui/icons-material/List";
import RadiusOnlyIcon from "@mui/icons-material/Adjust";
import ShowAllIcon from "@mui/icons-material/HighlightOff";
import AddHotspotIcon from "@mui/icons-material/AddLocation";
import { Container } from "@mui/system";
import { GET_HOTSPOTS_BY_CITY_QUERY } from "../queries/queries";
import { useQuery } from "@apollo/client";
import distanceBetweenCoordinates from "../lib/distanceBetweenCoordinates";
import { GPSContext } from "./ShowCurrentLocation";
import AddHotspot from "./AddHotspot";
import Map from "./Map";

interface hotspot {
  city: { name: string };
  coordinates: { lat: number; long: number };
  radius: number;
  name: string;
  description: string;
  id: string;
}

export default function Hotspots({
  selectedCityId,
}: {
  selectedCityId: string;
}) {
  //state
  //const [ text, setText ] = React.useState<string>('');
  const [ isMapModeOn, setIsMapModeOn ] = React.useState<boolean>(false);
  const [ isPlaying, setIsPlaying ] = React.useState<boolean>(false);
  const [ isRespectRadiusOff, setIsRespectRadiusOff ] =
    React.useState<boolean>(false);
  const [ isAddHotspotModalOpen, setIsAddHotspotModalOpen ] =
    React.useState<boolean>(false);
  //get context
  const gpsCoordinates = React.useContext(GPSContext);
  const { data, loading, error } = useQuery(GET_HOTSPOTS_BY_CITY_QUERY, {
    variables: { cityId: "63daa3c0086bf959ab6bb789" },
  });

  if (loading) return <div>loading</div>;
  if (error) {
    return <div>error</div>;
  }
  const synth = window.speechSynthesis;
  function playDescription(text: string) {
    synth.cancel();
    if (isPlaying) {
        setIsPlaying(false);
        return
    }
    const speechText = new SpeechSynthesisUtterance();
    speechText.text = text;
    synth.speak(speechText);
    setIsPlaying(true);
  }
  function pauseDescription() {
    synth.pause();
    setIsPlaying(!isPlaying);
  }
  function resumeDescription() {
    synth.resume();
    setIsPlaying(!isPlaying);
  }
  function stopDescription() {
    synth.cancel();
    setIsPlaying(false);
  }

  return (
    <Box sx={{overflowX: 'hidden'}}>
    <AppBar position='fixed'  elevation={0}>
        <Toolbar>
            <Typography variant='h6' component='div' sx={{ display: {xs: 'none', md: 'block'}, marginRight: '60px' }}>
            Open walking Tour
          </Typography>
          <Typography variant='h6' component='div' sx={{ display: {xs: 'block', md: 'none'}, marginRight: '30px' }}>
            OWT
          </Typography>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => {
                if (isPlaying) pauseDescription();
                else resumeDescription();
            }}
            >
            {isPlaying ? <PauseIcon /> : <PlayIcon /> }
          </IconButton>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={()=>{stopDescription()}}>
            <StopIcon />
          </IconButton>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setIsMapModeOn(!isMapModeOn)}>
            {isMapModeOn ? <ListIcon /> : <MapIcon />}
          </IconButton>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setIsRespectRadiusOff(!isRespectRadiusOff)}>
            {isRespectRadiusOff ? <ShowAllIcon /> : <RadiusOnlyIcon />}
          </IconButton>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setIsAddHotspotModalOpen(true)}>
            { <AddHotspotIcon /> }
          </IconButton>

          <Button color='inherit'></Button>
        </Toolbar>
      </AppBar>
    

      {isMapModeOn ? (
        <Map hotspots={data.hotspotsByCity} playDescription={playDescription} />
      ) : (
        <Box sx={{position: 'absolute', top: 56}}>
        <Grid container spacing={2}>
          {data.hotspotsByCity
            .filter((hotspot: hotspot) => {
              //is the user in the radius of this hotspot?
              if (isRespectRadiusOff) return true;
              return (
                distanceBetweenCoordinates(
                  gpsCoordinates?.coords.latitude,
                  gpsCoordinates?.coords.longitude,
                  hotspot.coordinates.lat,
                  hotspot.coordinates.long
                ) < hotspot.radius
              );
            })
            .map((hotspot: hotspot) => {
              //render JSX
              return (
                <Grid item xs= {12} sm={12} md={4} lg={3} key={hotspot.id} gap='2px'>
                  <HotspotCard hotspot={hotspot} setText={playDescription} />
                </Grid>
              );
            })}
        </Grid>
        </Box>
      )}
    {isAddHotspotModalOpen && <AddHotspot close={()=>{setIsAddHotspotModalOpen(false)}}/>}
    </Box>
  );
}

function HotspotCard({ hotspot, setText }: { hotspot: hotspot; setText: any }) {
  return (
    <Card onClick={() => setText(hotspot.description)} sx={{width:'auto'}}>
      <CardHeader title={hotspot.name} subheader={hotspot.city?.name} />
      <CardContent>
        <Typography variant='body2'> {hotspot.description}</Typography>
        <Typography variant='body2'>
          {`Latitude: ${hotspot.coordinates.lat}`}
        </Typography>
        <Typography variant='body2'>{`Longitude: ${hotspot.coordinates.long}`}</Typography>
      </CardContent>
    </Card>
  );
}
