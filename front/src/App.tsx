import * as React from 'react';
import AddHotspot from './components/AddHotspot';
import CityList from './components/CityList';
import ShowCurrentLocation from './components/ShowCurrentLocation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Hotspots from './components/Hotspots';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Test from './components/test';

const client: any = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  const [selectedCityId, setSelectedCityId ] = React.useState('');

  return (
    <ApolloProvider client={client} >
      <Container id="main">
        <Typography 
          align='center'
          variant='h1'
          color='primary'
          gutterBottom>
            Open Walking Tour
        </Typography>

        <ShowCurrentLocation>        
          <AddHotspot />
          <CityList setCityId={ setSelectedCityId } />
          { selectedCityId ? <Hotspots selectedCityId={ selectedCityId } /> : <></>}
        </ShowCurrentLocation>
        {/* <Test /> */}

      </Container>
    </ApolloProvider>
  );
}
