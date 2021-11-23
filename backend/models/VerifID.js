const mongoose = require('mongoose');

// Vérification des informations d'identification de l'utilisateur, renvoie l _id de l'utilisateur depuis la base
//  de données et un token web JSON signé (contenant également l'_id de l'utilisateur).
const verifIdUserSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});


module.exports = mongoose.model('VerifID', verifIdUserSchema)