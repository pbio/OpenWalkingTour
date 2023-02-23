


import * as React from 'react';
import Grid from '@mui/material/Grid';
import { getStepContentUtilityClass, Paper, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { GET_CITIES_QUERY } from '../queries/queries';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export default function Test({}){
     //test graphql
  const query = gql`{ hello }`;
  const { data, loading, error } = useQuery(query);
    if (loading) return <div>loading</div>;
    if (error) {
        console.log(error)
        return <div>error</div>
        
    }
    console.log(data);
    return <div> {data.hello} </div>;
}