const express = require('express');
const router = express.Router();
const StuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//********************** ROUTES ********************************* *


// Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.
// router.post('/auth/signup', StuffCtrl.createID);

// Vérification des informations d'identification de l'utilisateur
// router.post('/auth/login', StuffCtrl.checkID);




// Renvoie un tableau de toutes les sauces de la base de données.
router.use('/sauces', auth, StuffCtrl.arrayIDs);


// Renvoie la sauce avec l’_id fourni.
router.get('/sauces/:id', auth,  StuffCtrl.oneID);


// Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre dans la base de données en définissant correctement
// son imageUrl.

router.post('/sauces', auth, multer, StuffCtrl.addSauce);


//Modif sauce
// const ModifSauces = require('./models/ModifSauces')
router.put('/sauces/:id', auth, StuffCtrl.modifSauce);


// Supprimer sauce
router.delete('/sauces/:id', auth, StuffCtrl.deleteSauce);


// Like

//....

//





module.exports = router;