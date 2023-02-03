import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {type: String, required: true},
    size: {type: String},
    country: {type: String},
    description: {type: String},
});

export default mongoose.model('City', citySchema);