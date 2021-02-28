const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//create user
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if(password.length < 6) {
        res.status(500).json({msg: "password length must be greater than 6 characters"});
        return;
    }

    let newUser = new User({
        username,
        passwordHash: bcrypt.hashSync(password, 10),
        numNotes: 0
    });

    newUser
        .save()
        .then(user => {
            jwt.sign({
                username: newUser.username
                //secret should always be obscured
            }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: `user ${err.keyValue['username']} already exists, try logging in`});
        });
});


router.post('/logic', (req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            if(!user) {
                res.status(500).json({msg: 'no user with that username: ' + username});
                return;
            } else if(!bcrypt.compareSync(password, user.passwordHash)) {
                res.status(500).json({msg: 'invalid password'});
            }
            jwt.sign({
                username: newUser.username
            }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;