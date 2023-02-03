import * as React from 'react'

export default function ShowCurrentLocation(){
    const [ userCurrentLocation, setUserCurrentLocation ]: [ userCurrentLocation: any, setUserCurrentLocation: any ] = React.useState();
    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition(setUserCurrentLocation);
    }, [])
    console.log(userCurrentLocation);
    return <div style={{position: 'fixed', bottom: '0'}}>{`lat: ${userCurrentLocation?.coords.latitude}, long: ${userCurrentLocation?.coords.longitude}`}</div>
}