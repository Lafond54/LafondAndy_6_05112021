// const Signup = require('../models/Signup')
// const VerifID = require('../models/VerifID')
const { json } = require('express');
const { log } = require('npmlog');
const { Sauces } = require('../models/Sauces')





exports.arrayIDs = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}


exports.oneID = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.addSauce = (req, res, next) => {
    const arraySauce = JSON.parse(req.body.sauces)

    delete req.body._id;

    const sauces = new Sauces({
        ...arraySauce,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${sauces.imageUrl
            }`,
        likes: 0,
        disLikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    sauces.save()
        .then(() => res.status(201).json({ message: "Sauce ajouté avec son image !" }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifSauce = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, nextr) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}