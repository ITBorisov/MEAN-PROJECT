const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const bcrypt = require("bcrypt");
const checkAuth = require('../middleware/check-auth');

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
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
         success: true,  message: 'User is register'
        })
      })
      .catch(err => {
        res.status(500).json({
         success: false, message: "Invalid authentication credentials!"
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
  if (req.userData.isAdmin === false) {
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
  User.findOne({ _id: req.userData.userId })
    .then(result => {
      res.status(200).json({
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        isAdmin: result.isAdmin,
        messages: result.messages
      });
    })
    .catch(err => {
      return res.status(404).json({
        message: "Not found"
      });
    })
})

router.post('/messages', checkAuth, (req, res) => {

  if (!req.body.message) {
      res.json({ success: false, message: 'No message provided' })
  }

  console.log(req.body.message);
  console.log(req.body.username);
  User.findOne({ username: req.body.username })
      .then(user => {
          if (!user) {
              return res.json({ success: false, message: 'User not found' })
          } else {
            user.messages.push({
              message: req.body.message,
              author: req.userData.username
            })
            user.save()
              .then(result => {
                  res.status(201).json({
                      success: true,
                      message: 'Your message is send',
                  })
              })
              .catch(err => {
                  res.json({
                      success: false,
                      message: 'Your message is not send',
                  })
              })
          }
      })

})

router.put('/makeAdmin/:id', checkAuth, (req, res) => {

  if (req.userData.isAdmin === false) {
    res.status(403).json({
      success: false,
      message: 'Only admins can do this'
    })
  }

  User.findOne({ _id: req.params.id })
    .then(user => {
   
        if(!user){
          res.status(404).json({success: false, message: 'There is not user'})
        }else{
          const newUser = new User({
            _id: user._id,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: true
          });

          User.updateOne({ _id: req.params.id}, newUser)
          .then(result => {
              if (result.n > 0) {
                  res.status(201).json({ success: true, message: "Update successful!" });
              } else {
                  res.status(401).json({ success: false, message: "Not authorized!" });
              }
          })
          .catch(error => {
              res.status(500).json({
                  message: "Couldn't udpate promotion!"
              });
          });
        }
    })
})

router.delete('/delete/:id', checkAuth, (req, res) => {
  if (req.userData.isAdmin === false) {
    res.status(403).json({
      success: false,
      message: 'Only admins can do this'
    })
  }

  User.deleteOne({ _id: req.params.id })
    .then(result => {
    
      if (result.n > 0) {
        res.status(200).json({ success: true, message: "Deletion successful!" });
      } else {
        res.status(401).json({ success: false, message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false, message: "Deleting user failed!"
      });
    });
})

router.get('/public-profile/:id', (req, res) => {

  User.findOne({ username: req.params.id })
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