import * as React from 'react';
import AddHotspot from '../components/AddHotspot';
import CityList from '../components/CityList';
import ShowCurrentLocation from '../components/ShowCurrentLocation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Hotspots from '../components/Hotspots';
import Map from '../components/Map';
import Test from '../components/Test';


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client: any = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  const [selectedCityId, setSelectedCityId ] = React.useState<string>('');
  const [name, setName ] = React.useState<string>();
  React.useEffect(() => {
    fetch('http://localhost:3000/api/user')
                    .then(response => response.json())
                    .then(response => setName(response.name));
  }, []);
  return (
    <ApolloProvider client={client} >
      <Container id="main">
        <Typography 
          align='center'
          variant={ selectedCityId ? 'h4' : 'h1' }
          color='primary'
          gutterBottom>
            Open Walking Tour
        </Typography>
        <ShowCurrentLocation>
          <Test />
          <AddHotspot />
          { selectedCityId 
            ? 
            <Hotspots selectedCityId={ selectedCityId } /> 
            : 
            <CityList setCityId={ setSelectedCityId } />
          }
        </ShowCurrentLocation>

      </Container>
    </ApolloProvider>
  );
}
