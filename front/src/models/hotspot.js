import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const hotspotSchema = new Schema({
    name: {type: String},
    coordinates:{
        lat: {type: Number},
        long: {type: Number},
    },
    cityId: {type: String},
    description: {type: String},
    radius: {type: Number}
})

//export default mongoose.model('Hotspot', hotspotSchema);
module.exports = mongoose.models.Hotspot || mongoose.model('Hotspot', hotspotSchema)