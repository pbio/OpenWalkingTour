import * as React from 'react';
import {    useQuery, 
            useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import {    GET_AUTHORS_QUERY, 
            ADD_HOTSPOT_MUTATION,
            GET_HOTSPOTS_BY_CITY_QUERY,
            GET_CITIES_QUERY } from '../queries/queries';
import { GPSContext } from './ShowCurrentLocation';



export default function AddHotspot():JSX.Element {
    //Queries
    const [ mutateFunction, bookMutation ] = useMutation(ADD_HOTSPOT_MUTATION);
    const authorsQuery = useQuery(GET_AUTHORS_QUERY);
    const citiesQuery = useQuery(GET_CITIES_QUERY);

    //context
    const GPSCoordinates = React.useContext(GPSContext);

    //State
    const [name, setName] = React.useState<string>('');
    const [authorId, setAuthorId] = React.useState<string>('');
    const [cityId, setCityId] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [radius, setRadius] = React.useState<number>(100);
    const [lat, setLat] = React.useState<number>(GPSCoordinates?.coords.latitude);
    const [long, setLong] = React.useState<number>(GPSCoordinates?.coords.longitude);




    function submitForm(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        mutateFunction({ variables:{ name, authorId, radius, coordinates: { lat, long }, description, cityId }, refetchQueries: [{query: GET_HOTSPOTS_BY_CITY_QUERY, variables: { cityId }}] });
        alert('successfully added your hotspot');
    }
    
    const fieldStyle = {
        padding: '10px',
        fontStyle: 'courrier new',
    }

    return (
        <Container style={{position: 'absolute', bottom: '310px', right: '0', width: '400px', height: '300px', margin: '15px'}} >
            <Typography variant='h4' align='center' >
                Add Hotspot
            </Typography>
        <form 
            id='add-book' 
            onSubmit={(event) => submitForm(event)} 
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div style={fieldStyle}>
                <TextField 
                    label='Hotspot name:'
                    required
                    fullWidth
                    onChange={event => setName(event.target.value)} />
            </div>

            <div style={ fieldStyle }>
                <TextField 
                    label='description'
                    required
                    fullWidth
                    multiline
                    rows={4}
                    onChange={ event => setDescription( event.target.value )} />
            </div>
            <div style={fieldStyle}>
                <TextField 
                    label='radius'
                    fullWidth
                    type='number'
                    onChange= { event => setRadius( +event.target.value )} />
            </div>
            <div style= { fieldStyle } >
                <TextField 
                    label='latitude'
                    fullWidth
                    onChange= { event => setLat( +event.target.value )} />
            </div>
            <div style={ fieldStyle }>
                <TextField 
                    label='longitude'
                    fullWidth
                    onChange= { event => setLong( +event.target.value )} />
            </div>
            <div style={fieldStyle}>
                <label> Author </label>
                <select 
                    onChange={ (event) => setAuthorId( event.target.value )}>
                    <option>Select Historian</option>
                    { authorsQuery.data ? 
                    authorsQuery.data.authors.map((author: {name: string, id: string} ) => {
                        return <option 
                                    key={ author.id } 
                                    value={author.id}> 
                                    { author.name } 
                                </option>
                    }):
                    <option disabled>loading still</option>}
                </select>
            </div>
            <div style={fieldStyle}>
                <label> City </label>
                <select 
                    onChange={ (event) => setCityId( event.target.value )}>
                    <option>Select City</option>
                    {citiesQuery.data ? 
                    citiesQuery.data.cities.map((city: {name: string, id: string} ) => {
                        return <option 
                                    key={ city.id } 
                                    value={ city.id }> 
                                    { city.name } 
                                </option>
                    }):
                    <option disabled>loading still</option>}
                </select>
            </div>
            <Button variant='contained' type="submit" form="add-book" value="Submit" > Add New Hotspot</Button>
        </form>
        </Container>
    )

}

