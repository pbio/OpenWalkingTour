import * as React from 'react';
import AddHotspot from '../components/AddHotspot';
import CityList from '../components/CityList';
import ShowCurrentLocation from '../components/ShowCurrentLocation';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Hotspots from '../components/Hotspots';


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client: any = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}api/graphql`,
  cache: new InMemoryCache(),
})

export default function App() {
  const [selectedCityId, setSelectedCityId ] = React.useState<string>('');
  const [name, setName ] = React.useState<string>();
  return (
    <ApolloProvider client={client} >
        <ShowCurrentLocation>
          { selectedCityId 
            ? 
            <Hotspots selectedCityId={ selectedCityId } /> 
            : 
            <CityList setCityId={ setSelectedCityId } />
          }
          <div></div>
        </ShowCurrentLocation>
    </ApolloProvider>
  );
}
