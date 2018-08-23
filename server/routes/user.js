const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const bcrypt = require("bcrypt");
const checkAuth = require('../middleware/check-auth');

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    })
  
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'User is register'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      })
  })
  
})

router.post('/login', (req, res, next) => {

  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then(user => {
    
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        
        return res.status(401).json({
          message: "Auth failed"
        });
      }
           
      const token = jwt.sign(
        { username: fetchedUser.username, userId: fetchedUser._id, isAdmin: fetchedUser.isAdmin },
        'secret',
        { expiresIn: "48h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        isAdmin: fetchedUser.isAdmin
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
})


router.get('/all', checkAuth, (req, res) => {
  if(req.userData.isAdmin === false){
    res.status(403).json({
      success: false,
      message: 'Only admins can access this route'
    })
  }
  User.find({})
        .then(users => {
            res.status(200).json({
                message: 'Users is fetched successfully',
                users: users
            });
        });
})

router.get('/profile', checkAuth, (req, res) => {
  User.findOne({_id: req.userData.userId})
    .then(result => {
      res.status(200).json({
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        isAdmin: result.isAdmin
      });
    })
    .catch(err => {
      return res.status(404).json({
        message: "Not found"
      });
    })
})

router.get('/public-profile/:id', (req, res) => {

  console.log(req.params.id);

  User.findOne({username: req.params.id})
    .then(result => {
      res.status(200).json({
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      });
    })
    .catch(err => {
      return res.status(404).json({
        message: "Not found"
      });
    })
})


module.exports = router;