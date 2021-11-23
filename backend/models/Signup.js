const mongoose = require('mongoose');



// Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données
const signupSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});





module.exports = mongoose.model('Signup', signupSchema);


