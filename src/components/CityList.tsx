import * as React from 'react';
import Grid from '@mui/material/Grid';
import { getStepContentUtilityClass, Paper, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { GET_CITIES_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/client';

interface city {
    name: string,
    description: string,
    id: string
}

export default function CityList({setCityId}:{setCityId:any}){
    const { data, loading, error } = useQuery(GET_CITIES_QUERY);
    if (loading) return <div>loading</div>;
    if (error) {
        return <div>error</div>
        console.log(error)
    }
    return (
        <Container>
            <Typography variant='h3' align='center'>Pick your city</Typography>
            <Grid container>
                {data.cities.map((city:city) => {
                    return (
                        <Grid item 
                            xs={4} sm={2} md={1}
                            key={city.id} 
                            gap="2px"
                            onClick={()=>{setCityId(city.id)}}>
                            <Button>{city.name}</Button>
                        </Grid>);
                })}
            </Grid>
        </Container>
    )
}