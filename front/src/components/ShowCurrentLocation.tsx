import * as React from 'react'



export default function ShowCurrentLocation({ children }: {children: JSX.Element[]}){
    const [ usersCurrentLocation, setUsersCurrentLocation ] = React.useState<{coords:{latitude: number, longitude: number}}>();
    const [ isErrorWithGPS, setIsErrorWithGPS ] = React.useState<boolean>(false);
    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition(setUsersCurrentLocation);
    }, [])
    console.log(usersCurrentLocation);
    return (<> {children.map((child)=>{
                    if (React.isValidElement(child)) 
                        
                        return React.cloneElement(child, usersCurrentLocation)
                    return child;
                    }) 
                }
                {/* show the users current location at the bottom */}
                <div style={{position: 'fixed', bottom: '0'}}> 
                {
                    isErrorWithGPS 
                    ? 
                    <>your navigator does not allow GPS tracking</>
                    :
                    <> {`lat: ${usersCurrentLocation?.coords.latitude}, long: ${usersCurrentLocation?.coords.longitude}`} </>
                }
                </div>
            </>);
}