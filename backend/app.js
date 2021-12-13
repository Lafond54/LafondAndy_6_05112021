const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const path = require('path');

//Creer une application express
const app = express();
//
require('dotenv').config()
// 
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');



// ******************* Mongoose ***********************************
const mongoose = require('mongoose');
const { signup } = require('./controllers/user');
mongoose.connect(process.env.SECRETDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



//********************* Rend le serveur accessible par d'autres origines  *************************
app.use(cors());



// Definit que l'on utilise du JSON pour le passage et la recuperation de parametre (bodyparser)
app.use(express.json());


// Encoder le contenu et bien gerer les accents
app.use(express.urlencoded({ extended: true }))

//
// app.use(express.static('images'))

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes + //Helmet protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP
app.use('/api/', helmet(), stuffRoutes);
app.use('/api/auth', helmet(), userRoutes);





// *************************************
module.exports = app;


