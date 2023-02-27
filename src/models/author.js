import mongoose from 'mongoose'

const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number},
})

//export default mongoose.model('Author', authorSchema);

module.exports = mongoose.models.Author || mongoose.model('Author', authorSchema)