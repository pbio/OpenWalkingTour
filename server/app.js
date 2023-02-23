import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from '../front/src/pages/api/schema/schema.js.js';


const app = express();

// allow cross origin requests
app.use(cors());
app.use('/graphql', graphqlHTTP({ 
    schema, graphiql: true
})) 
//mongodb+srv://pebioche:<password>@cluster0.l9ehctp.mongodb.net/?retryWrites=true&w=majority


mongoose
    .connect("mongodb+srv://pebioche:AQ44vFNyo7jp94hq@cluster0.l9ehctp.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
        console.log('connected to the DB'); 
        try {
            app.listen(4000, ()=> { console.log('now listening for requests on port 4000')});
        } catch (error) {
            console.log(error)
        }
    })

//graphqlHTTP is fired any time endpoint is called





