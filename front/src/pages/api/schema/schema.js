//import graphql from 'graphql';
const graphql = require('graphql');
import Book from '../../../models/book.js';
import Author from '../../../models/author.js';
import City from '../../../models/city.js';
import Hotspot from '../../../models/hotspot.js';


const { 
        GraphQLObjectType,
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
        GraphQLFloat,
        GraphQLInputObjectType
    } = graphql; 


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorId: parent.id});
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const LocationType = new GraphQLObjectType({
    name: "Location",
    description: "lat and long",
    fields: () => ({
      lat: { type: GraphQLFloat },
      long: { type: GraphQLFloat },
    })
  });
//separate input file
const LocationInput = new GraphQLInputObjectType({
    name: "LocationInput",
    description: "lat and long input",
    fields: () => ({
      lat: { type: new GraphQLNonNull(GraphQLFloat) },
      long: { type: new GraphQLNonNull(GraphQLFloat) },
    })
});

const CityType = new GraphQLObjectType({
    name: 'City',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        size: { type: GraphQLString },
        country: { type: GraphQLString },
        description: { type: GraphQLString },
    })
});

const HotspotType = new GraphQLObjectType({
    name: 'Hotspot',
    fields: () =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        coordinates: { type: LocationType },
        city: {
            type: CityType,
            resolve(parent, args){
                return City.findById(parent.cityId);
            }
        },
        description: { type: GraphQLString },
        radius: { type: GraphQLInt },
        authorId: { type: GraphQLID },
    })
})

// Root Query will be 
// book(id: '123'){
//     name
//     genre
//     type
//     author
// }

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Book.findById(args.id);
                //return _.find(books, { id: args.id });
                //code get data from DB or another source
                //Mongoose => Book.findOne({id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return Author.findById(args.id);
                //return _.find(authors, { id: args.id });
            }

        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent) {
                return Book.find();
            }

        }, 
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find();
            }
        },
        cities: {
            type: new GraphQLList(CityType),
            resolve(parent, args){
                return City.find();
            }
        },
        hotspots: {
            type: new GraphQLList(HotspotType),
            resolve(parent, args){
                return Hotspot.find()
            }
        }, 
        hotspotsByCity: {
            type: new GraphQLList(HotspotType),
            args: { cityId: {type: GraphQLID }},
            resolve(parent, args){
                return Hotspot.find({cityId: args.cityId});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            } 
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                genre: {type: new GraphQLNonNull(GraphQLString) },
                authorId: {type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                });
                return book.save();
            }
        },
        addCity: {
            type: CityType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                size: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString},
            },
            resolve(parent, args) {
                let city = new City({
                    name: args.name,
                    size: args.size,
                    country: args.country,
                    description: args.description,
                });
                return city.save();
            }
        },
        addHotspot: {
            type: HotspotType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                coordinates: { type: LocationInput },
                cityId: { type: new GraphQLNonNull(GraphQLID) },
                description: { type: GraphQLString },
                radius: { type: GraphQLInt },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args){
                let hotspot = new Hotspot({
                    name: args.name,
                    description: args.description,
                    radius: args.radius,
                    coordinates: args.coordinates,
                    cityId: args.cityId,
                    authorId: args.authorId,
                })
                return hotspot.save();
            }
        }
    }
})

const SchemaExport = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
module.exports = SchemaExport;