
import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import City from '../../models/city.js';
import Author from '../../models/author.js';
import Hotspot from '../../models/hotspot.js';
import dbConnect from '../../lib/dbConnect.js';
dbConnect();
mongoose.connection.once('open', () => {
  console.log('connected to the DB'); 
})
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l9ehctp.mongodb.net/?retryWrites=true&w=majority`;

const resolvers = {
  Query: {
    cities: async (parent, args, contextValue, info) => { 
        const myCities = await City.find();
        return myCities;
    },
    authors: async (parent, args, contextValue, info) => { 
      const myAuthors = await Author.find();
      return myAuthors;
    },
    hotspotsByCity: async (parent, args, contextValue, info) => { 
      const myHotspots = await Hotspot.find({cityId: args.cityId});
      return myHotspots;
    }
  },
  Mutation: {
    addHotspot: async (parent, args) => {
      let hotspot = new Hotspot({
          name: args.name,
          description: args.description,
          radius: args.radius,
          coordinates: args.coordinates,
          cityId: args.cityId,
          authorId: args.authorId
      });
      const newHotspot = await hotspot.save();
      return newHotspot;
    }
  }
};

const typeDefs = gql`
  type City {
    name: String
    id: ID
    description: String
    size: String,
    country: String
  }
  type Author {
    name: String
    id: ID
  }
  type Location {
    lat: Float
    long: Float
  }
  input LocationInput {
    lat: Float
    long: Float
  }
  type Hotspot {
    id: ID
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
  type Mutation {
    addHotspot( name: String,
      description: String,
      radius: Int,
      coordinates: LocationInput,
      cityId: ID,
      authorId: ID ): Hotspot
  }
`;

let db

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async () => {
    // if (!db) {
    //   try {

    //     db = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    //       console.log('this works');
    //       return mongoose
    //     })
    //     mongoose.connection.once('open', () => {
    //       console.log('connected to the DB'); 
    //     })
    //   } catch (e) {
    //     console.log('--->error while connecting with graphql context (db)', e)
    //   }
    // }

    return { db: db }
  },
})

export default startServerAndCreateNextHandler(server);