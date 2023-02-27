import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: {type: String, required: true},
    genre: {type: String},
    authorId: {type: String} 
})

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema) 
//export default mongoose.model('Book', bookSchema);