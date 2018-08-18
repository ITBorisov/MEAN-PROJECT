const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const bcrypt = require("bcrypt");

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new User({
      username: req.body.username,
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
        { username: fetchedUser.username, userId: fetchedUser._id },
        'secret',
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
})


module.exports = router;