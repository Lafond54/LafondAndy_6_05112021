
// const mongoose = require('mongoose');




// // A TRANSFERER ? Met à jour la sauce avec l'_id fourni. Si une image est téléchargée, elle est capturée et l’imageUrl de la sauce est mise à jour. Si
// // aucun fichier n'est fourni, les informations sur la sauce se trouvent directement dans le corps de la requête (req.body.name,
// // req.body.heat, etc.). Si un fichier est fourni, la sauce transformée en chaîne de caractères se trouve dans req.body.sauce. Notez que
// // le corps de la demande initiale est vide ; lorsque multer est ajouté, il renvoie une chaîne du corps de la
// // demande basée sur les données soumises avec le fichier.
// const majSauceSchema = mongoose.Schema({
//     sauce: { type: String, required: true },
//     image: { type: String, required: true },  //  Image String ? ?????
// });


// module.exports = mongoose.model('ModifSauces', majSauceSchema)