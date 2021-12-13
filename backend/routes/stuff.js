const express = require('express');
const router = express.Router();
const StuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



//********************** ROUTES ********************************* *



// Renvoie un tableau de toutes les sauces de la base de données.
router.get('/sauces', auth, StuffCtrl.arrayIDs);


// Renvoie la sauce avec l’_id fourni.
router.get('/sauces/:id', auth, StuffCtrl.oneID);


// Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre dans la base de données en définissant correctement
// son imageUrl.

router.post('/sauces', auth, multer, StuffCtrl.addSauce);


//Modif sauce
router.put('/sauces/:id', auth, multer, StuffCtrl.modifSauce);


// Supprimer sauce
router.delete('/sauces/:id', auth, multer, StuffCtrl.deleteSauce);


// Like
router.post('/sauces/:id/like', auth, StuffCtrl.likeSauce)


//

module.exports = router;