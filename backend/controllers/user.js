const User = require('../models/User');
// const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

// Fonction qui sale et hache le password avec la var SALT et Crypto

// function hashPassword(password) {
//     const passwordSalted = password + process.env.SALT

//     const hash = crypto.createHash('sha256')
//     hash.update(passwordSalted)
//     return hash.digest('hex')
// }

// exports.signup = (req, res, next) => {
//     console.log(req.body)
//     const user = new User({
//         email: req.body.email,
//         password: hashPassword(req.body.password)
//     })
//     user.save()
//         .then(() => res.status(201).json({ message: "Utilisateur enregistré dans la BDD !" }))
//         .catch(error => res.status(400).json({ error }));

// };


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)    //compare impossible avec crypto, quelle methode ?
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn : '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };