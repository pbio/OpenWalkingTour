import { gql } from '@apollo/client';

export const GET_AUTHORS_QUERY = gql`
{
    authors{
        name
        id
    }
}`;

export const GET_CITIES_QUERY = gql`
{
    cities {
        name
        id
        size
    }
}`

export const GET_BOOKS_QUERY = gql`
{
    books {
        name
        id
    }
}`

export const ADD_BOOK_MUTATION = gql`
mutation AddBook( $authorId: ID!, $name: String!, $genre: String! ){
    addBook( authorId: $authorId, name: $name, genre: $genre ){
        name
        genre
    }
}
`;

export const ADD_HOTSPOT_MUTATION = gql`
mutation AddHotspot( $authorId: ID!, $cityId: ID!, $name: String!, $description: String, $radius: Int!, $coordinates: LocationInput){
    addHotspot( authorId: $authorId, cityId: $cityId, name: $name, description: $description, radius: $radius, coordinates: $coordinates ){
        name
        id
        city{
            name
        }
        coordinates{
            lat
        }
        description
        radius
    }
}    
`


export const GET_BOOK_QUERY = gql`
query GetBook( $id: ID! ){
    book( id: $id ){
        name
        genre
        author{
            name
            age
        }
    }
}
`;

export const GET_HOTSPOTS_BY_CITY_QUERY = gql`
query GetHotspotsByCity( $cityId: ID! ){
    hotspotsByCity( cityId: $cityId ){
        name
        id
        description
        authorId
        coordinates{
            lat
            long
        }
        city{
            name
        }
    }
}
`;