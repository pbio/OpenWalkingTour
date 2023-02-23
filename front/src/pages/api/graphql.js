//import { graphql, buildSchema } from "graphql";
import { ApolloServer } from '@apollo/server';
//import schema from './schema/schema.js';
//const schema = require('./schema/schema.js');
import { makeExecutableSchema } from 'graphql-tools'
import dbConnect from '../../lib/dbConnect';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import City from '../../models/city.js';

dbConnect();

const resolvers = {
  Query: {
    hello: () => 'world',
    cities: () => [{name:'marseille', id: 23, description: 'lalaland', size: 'medium'}, {name:'brooklyn', id: 13, description: 'other description', size: 'large'}],
    //cities: () => City.find(),
    authors: () => [{name: 'Juan', id: 1}, {name: 'Paul', id: 2},],
    hotspotsByCity: () => [{name: 'longchamp', id: 10, authorId: 1, radius: 100, description: 'dsdfsf', cityId: 13, coordinates: {lat:100, long:200} }],
  }
};

const typeDefs = gql`
  type City {
    name: String
    id: Int
    description: String
    size: String
  }
  type Author {
    name: String
    id: Int
  }
  type Location {
    lat: Float
    long: Float
  }
  type Hotspot {
    id: Int
    name: String
    coordinates: Location
    city: City
    description: String
    radius: Int
    authorId: Int
  }
  type Query {
    hello: String
    cities: [City]
    authors: [Author]
    hotspotsByCity( cityId: ID! ): [Hotspot]
  }
`;

// export default async (req, res) => {
//   console.log('going to connect to DB');
  
//   console.log('connection success')
//   //console.log(schema)
//   const query = req.body.query;
//   const response = await graphql(schema2, query, root);

//   return res.end(JSON.stringify(response));
// };

const server = new ApolloServer({ resolvers, typeDefs });
export default startServerAndCreateNextHandler(server);

