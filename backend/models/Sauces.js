
const mongoose = require('mongoose');


const saucesSchema = mongoose.Schema({
    userId: { type: String, required: true }, 
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true},
    fileName: { type: String, required: true },
    heat: { type: Number, required: true },  
   
    usersLiked: { type: Array }, // default []
    usersDisliked: { type: Array } // default []


});


module.exports = mongoose.model('Sauces', saucesSchema)

