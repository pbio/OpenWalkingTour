import * as React from 'react';
import AddHotspot from './components/AddHotspot';
import CityList from './components/CityList';
import ShowCurrentLocation from './components/ShowCurrentLocation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Hotspots from './components/Hotspots';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client: any = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {

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
        <AddHotspot />
        <CityList />
        <ShowCurrentLocation />
        <Hotspots />
      </Container>
    </ApolloProvider>
  );
}
