const validator = require("email-validator");;


//Verification de la qualité du password par rapport au schéma
module.exports = (req, res, next) => {
    if (validator.validate(req.body.email)) {
        next();
    } else {
        console.log('Mail invalide')
        return res.status(400).json({ error: "Email invalide" })
    }
}