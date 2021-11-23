
const mongoose = require('mongoose');

// Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre dans la base de données en
// définissant correctement son imageUrl. Initialise les likes et dislikes de la sauce à 0 et les usersLiked et
// usersDisliked avec des tableaux vides. Remarquez que le corps de la demande initiale est vide ; lorsque multer est ajouté, il renvoie
// une chaîne pour le corps de la demande en fonction des données soumises avec le fichier.
// const saucesSchema = mongoose.Schema({
//     sauce: { type: String, required: true },
//     image: { type: String, required: true },  //  Image String ? ?????
// });



const saucesSchema = mongoose.Schema({
    userId: { type: String, required: true }, 
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },    
    likes: { type: Number, required: true }, 
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array }, // default []
    usersDisliked: { type: Array } // default []


});




module.exports = mongoose.model('Sauces', saucesSchema)

// userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la
// sauce
// ● name : String — nom de la sauce
// ● manufacturer : String — fabricant de la sauce
// ● description : String — description de la sauce
// ● mainPepper : String — le principal ingrédient épicé de la sauce
// ● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
// ● heat : Number — nombre entre 1 et 10 décrivant la sauce
// ● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
// ● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
// sauce
// ● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
// qui ont aimé (= liked) la sauce
// ● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
// utilisateurs qui n'ont pas aimé (= disliked) la sauce