import * as React from 'react'
import { Typography } from '@mui/material';

export const GPSContext = React.createContext<any>(null); //create context outside to access from anywhere

export default function ShowCurrentLocation({ children }: {children: JSX.Element[] | JSX.Element }){
    const [ usersCurrentLocation, setUsersCurrentLocation ] = React.useState<{coords:{latitude: number, longitude: number}}>();
    const [ isErrorWithGPS, setIsErrorWithGPS ] = React.useState<boolean>(false);
    const [ GPSError, setGPSError ] = React.useState<any>();

    const getGPS:any = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setUsersCurrentLocation, setGPSError);
            
        } else {
            setIsErrorWithGPS(true);
        }
        await setTimeout(()=>{
            return getGPS();
        }, 20000);
    }
    React.useEffect(()=>{
        getGPS();
    }, [])
    return (<> 
                {/* use context to provide GPS */}
                <GPSContext.Provider value={ usersCurrentLocation } >
                    { children }
                    <div style={{ position: 'fixed', bottom: '0', backgroundColor: 'white' }} > {/* show the users current location at the bottom */}
                    {
                        isErrorWithGPS 
                        ? 
                        <Typography variant='body1'>Your navigator does not allow GPS tracking</Typography>
                        :
                        <Typography variant='body1'> {`Lat: ${usersCurrentLocation?.coords.latitude}, Long: ${usersCurrentLocation?.coords.longitude}`} </Typography>
                    }
                    </div>
                </GPSContext.Provider>
            </>);
}