import mongoose from "mongoose";

const toursSchema = new mongoose.Schema({
    tour_name: {
        type:String,
        unique:true,
        maxLength: 200,
        required:true,
    },
    img_src:{
        type:String,
    },
    description: {
        type:String,
        maxLength:1000,
    },
    price: {
        type: Number,
        required:true,
    },
    members_notes: {
        type:String,
    }

});

export default mongoose.model('Tour', toursSchema);
