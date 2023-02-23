import * as React from 'react'
import { Typography } from '@mui/material';

export const GPSContext = React.createContext<any>(null); //create context outside to access from anywhere

export default function ShowCurrentLocation({ children }: {children: JSX.Element[]}){
    const [ usersCurrentLocation, setUsersCurrentLocation ] = React.useState<{coords:{latitude: number, longitude: number}}>();
    const [ isErrorWithGPS, setIsErrorWithGPS ] = React.useState<boolean>(false);

    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition(setUsersCurrentLocation);
    }, [])
    console.log(usersCurrentLocation);
    return (<> 
                {/* use context to provide GPS */}
                <GPSContext.Provider value={ usersCurrentLocation } >
                    { children }
                    <div style={{ position: 'fixed', bottom: '0' }} > {/* show the users current location at the bottom */}
                    {
                        isErrorWithGPS 
                        ? 
                        <Typography variant='body1'>Your navigator does not allow GPS tracking</Typography>
                        :
                        <Typography variant='body1'> {`Current location: lat: ${usersCurrentLocation?.coords.latitude}, long: ${usersCurrentLocation?.coords.longitude}`} </Typography>
                    }
                    </div>
                </GPSContext.Provider>
            </>);
}