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
        .then(promotions => {
            res.status(200).json({
                promotions: promotions
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

router.put('/:id', checkAuth, (req, res) => {

  const promotion = new Promotion({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  Promotion.updateOne({ _id: req.params.id, creator: req.userData.userId }, promotion)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate promotion!"
      });
    });
})



router.delete('/:id', checkAuth, (req, res, next) => {
    // Promotion.deleteOne({_id: req.params.id}).then(result => {
    //     console.log(result);
    //     res.status(200).json({message: 'Promotion is deleted'})
    // })
    Promotion.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
})



module.exports = router;