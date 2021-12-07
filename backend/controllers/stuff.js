const Sauces = require('../models/Sauces')
const fs = require('fs');
const { json } = require('express');

function sauceNormalizer(sauce, req) {
    return {
        ...sauce.toObject(),
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${sauce.fileName}`
    }


}


exports.arrayIDs = (req, res) => {

    Sauces.find()

        .then(sauces => res.status(200).json(sauces.map(sauce => sauceNormalizer(sauce, req))))
        .catch(error => res.status(400).json({ error }));
}


exports.oneID = (req, res) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauceNormalizer(sauce, req)))
        .catch(error => res.status(404).json({ error }));
}

exports.addSauce = (req, res) => {
    const arraySauce = JSON.parse(req.body.sauce)
    // delete req.body._id;

    const sauce = new Sauces({
        ...arraySauce,
        fileName: req.file.filename,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce ajouté avec son image !" }))
        .catch(error => res.status(400).json({ error }));
}


exports.modifSauce = (req, res) => {

    if (req.file) {  // Si il y a une  nouvelle image il faut supprimer la précedente avant de modifier la sauce

        Sauces.findOne({ _id: req.params.id })   // _id? avec un underscore
            .then(sauce => {
                const filename = sauce.fileName;
                fs.unlink(`public/images/${filename}`, () => {

                    const sauceObject =
                    {
                        ...JSON.parse(req.body.sauce),           //Pourquoi JSON.parse ici ?
                        fileName: req.file.filename
                    }

                    Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
                        .catch(error => res.status(400).json({ error }));

                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {   // Si on modifie pas l'image, on met à jour la sauce sans toucher aux images
        const sauceObject = { ...req.body };                        //.. le spread de req.body ici fait reference à quoi?
        Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
            .catch(error => res.status(400).json({ error }))
    };
}


exports.deleteSauce = (req, res) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.fileName;
            fs.unlink(`public/images/${filename}`, () => {

                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.likeSauce = (req, res) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    Sauces.findOne({ _id: sauceId })
        .then(sauce => {

            sauce.usersLiked = sauce.usersLiked.filter(_userId => userId !== _userId)  // ??????????????????????
            sauce.usersDisliked = sauce.usersDisliked.filter(_userId => userId !== _userId) //????????????????????
            switch (like) {
                case 1:  //   CAS n°1: sauce liked
                    sauce.usersLiked.push(userId)
                    break;
                case -1:  //  CAS n°2: sauce disliked
                    sauce.usersDisliked.push(userId)
                    break;


            };

            sauce.save()
                .then(() => res.status(200).json({ message: 'Sauce evaluée !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}


