const express = require('express');
const router = express.Router();

const Promotion = require('../models/promotion');
const checkAuth = require('../middleware/check-auth');





router.post('', checkAuth, (req, res, next) => {
    const body = req.body;
    
    console.log(req.user);

    const promotion = new Promotion({
        title: body.title,
        content: body.content,
        image: body.image,
        creator: req.userData.userId
    });

    promotion.save().then(promotions => {
        res.status(201).json({
            message: 'Promotion is added successfully',
            post: {
                ...promotions,
                id: promotion._id
            }
        })
    })
})

router.get('', (req, res, next) => {
    Promotion.find({})
        .then(promotion => {
            res.status(200).json({
                message: 'Promotions is fetched successfully',
                promotions: promotion 
            });
        });
})

router.get('/mypromotion', checkAuth, (req, res) => {
    console.log('dwdwd');
    console.log(req.userData.userId);
    console.log('dwdwaaaa');
    Promotion.find({creator: req.userData.userId})
        .then(result => {
            res.status(200).json({
                result
            })
        })
} )

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Promotion.findById(id)
        .then(promotion => {
            res.status(200).json({ promotion })
        })
        .catch(err => {
            console.log('Greshka')
        })
})

router.put('/:id', (req, res) => {

})



router.delete('/:id', checkAuth, (req, res, next) => {
    Promotion.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Promotion is deleted'})
    })
})



module.exports = router;