//Google Maps API Key: 'AIzaSyD4IgIfDosSgnwwlB_e2eCqTprRdBDLmbw'

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, BicyclingLayer } from '@react-google-maps/api';
import { GPSContext } from './ShowCurrentLocation';

const containerStyle = {
  width: '700px',
  height: '700px'
};



function Map({hotspots, playDescription}:{hotspots:any, playDescription:any}) {
    //useContext to get coordinates
    const GPSCoordinates = React.useContext(GPSContext);

    const center = {
        lat: GPSCoordinates.coords.latitude,
        lng: GPSCoordinates.coords.longitude
      };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD4IgIfDosSgnwwlB_e2eCqTprRdBDLmbw"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded && GPSCoordinates ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
        <BicyclingLayer />
        { /* Add marker at my current location */ }
        <Marker 
            position = { center } 
            title = 'My Location' />
        { /* Add markers at each hotspot */ }
        {hotspots.map((hotspot: any, hotspotIdx: number) => {
                console.log(hotspot);
                return <Marker 
                            key = { hotspotIdx }
                            title = { hotspot.title }
                            position = {{ lat: hotspot.coordinates?.lat, lng: hotspot.coordinates?.long }} 
                            onClick = { () => { playDescription(hotspot.description) }} />
        })}
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)