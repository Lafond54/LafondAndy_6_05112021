const express = require('express');
const cors = require('cors');

const app = express();


const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');



// jwt *******************************
const jwt = require('jsonwebtoken')
// // Choisir sha256 algo hachage
// require('dotenv').config()

// // const user = require('./models/User')
// const user = {
//   id: 42,
//   name: 'Jean bon',     // A supprimer
//   email: 'jeanbon@gmail.com',
//   admin: true
// }

// function generateAccesToken(user) {
//   return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '1800s' });  // <= user ?
// }

// const accesToken = generateAccesToken(user);

// console.log(accesToken)

// Autorisation et authentification d'appel API. Verifier si le JWT est correct

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];


//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(401);
//     }
//     req.user = user
//     next()
//   })
// }

// app.get('/api/me', authenticateToken, (req, res) => {
//   req.send(req.user);
// }); 


// ******************* Mongoose ***********************************
const mongoose = require('mongoose');
const { signup } = require('./controllers/user');
mongoose.connect('mongodb+srv://Andy54:Securite54@cluster0.dqvk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



//********************* CORS et Bydoparse *************************
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

//
// Definit que l'on utilise du JSON pour le passage et la recuperation de parametre
app.use(express.json());
// Encoder le contenu et bien gerer les accents
app.use(express.urlencoded({ extended: true }))




// Routes
app.use('/api', stuffRoutes);
app.use('/api/auth', userRoutes);




//test
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !!!!!!!' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});






// *************************************
module.exports = app;


// app.listen() // remplace server.js