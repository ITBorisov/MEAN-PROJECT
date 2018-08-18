const express = require('express');
const router = express.Router();

const Promotion = require('../models/promotion');
const checkAuth = require('../middleware/check-auth');

router.post('', (req, res, next) => {
    const body = req.body;
    
    const promotion = new Promotion({
        title: body.title,
        content: body.content
    });

    promotion.save()

    res.status(201).json({
        message: 'Promotion is added successfully'
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

router.delete('/:id', checkAuth, (req, res, next) => {
    Promotion.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Promotion is deleted'})
    })
})


module.exports = router;