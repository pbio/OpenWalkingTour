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
import { ButtonGroup } from '@mui/material';



export default function AddHotspot():JSX.Element {
    //Queries
    const [ mutateFunction, bookMutation ] = useMutation(ADD_HOTSPOT_MUTATION);
    const authorsQuery = useQuery(GET_AUTHORS_QUERY);
    const citiesQuery = useQuery(GET_CITIES_QUERY);

    //context
    const GPSCoordinates = React.useContext(GPSContext);

    //State
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');
    const [authorId, setAuthorId] = React.useState<string>('');
    const [cityId, setCityId] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [radius, setRadius] = React.useState<number>(100);
    const [lat, setLat] = React.useState<number>(GPSCoordinates?.coords.latitude);
    const [long, setLong] = React.useState<number>(GPSCoordinates?.coords.longitude);

    //useEffect
    React.useEffect(()=>{
        setLat(GPSCoordinates?.coords.latitude);
        setLong(GPSCoordinates?.coords.longitude);
    },[GPSCoordinates])

    React.useEffect(()=>{
        console.log(lat)
    }, [lat])




    function submitForm(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        mutateFunction({ variables:{ name, authorId, radius, coordinates: { lat, long }, description, cityId }, refetchQueries: [{query: GET_HOTSPOTS_BY_CITY_QUERY, variables: { cityId }}] });
        setIsModalOpen(false)
        alert('successfully added your hotspot');
    }
    
    const fieldStyle = {
        padding: '10px',
        fontStyle: 'courrier new',
    }
    if (!isModalOpen) 
        return <Button 
                        style={{position: 'fixed', bottom: '10px', right: '10px' }} 
                        onClick={()=>{setIsModalOpen(true)}}>
                            Add Hotspot
                </Button>
    return (
        <Container style= {{ position: 'fixed', bottom: 30, right: 0, width: 400, margin: 25, backgroundColor: 'white', border:'1px lightgrey solid', borderRadius: 10 }} >
            <Typography variant='h4' align='center' >
                Add Hotspot
            </Typography>
        <form 
            id='add-hotspot' 
            onSubmit={ (event) => submitForm(event)} 
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
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
                    value={lat}
                    onChange= { event => setLat( +event.target.value )} />
            </div>
            <div style={ fieldStyle }>
                <TextField 
                    label='longitude'
                    fullWidth
                    value={long}
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
            <ButtonGroup fullWidth>
                <Button variant='contained' type="submit" form="add-hotspot" value="Submit" > 
                    Add New Hotspot
                </Button>
                <Button onClick={ () => setIsModalOpen(false) }>
                    cancel
                </Button>
            </ButtonGroup>
        </form>
        </Container>
    )

}

