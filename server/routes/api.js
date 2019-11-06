const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const db = "mongodb+srv://peterFred:V1nt4ge09@angularauth-8o0wx.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthroised Request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthroised Request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthroised Request');
    }
    req.uesrId = payload.subject;
    next();

}




router.get('/', (req, res) => {
    res.send('from APR router');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secrectKey');
            res.status(200).send({token});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else if (user.password !== userData.password) {
                res.status(401).send("Invalid Password");
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'secrectKey');
                res.status(200).send({token});
            }

        }
    });
});




router.get('/events', (req, res) => {
    let events =[{
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "3",
        "name": "Car Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "4",
        "name": "Plane Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "5",
        "name": "Train Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "6",
        "name": "Lego Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "7",
        "name": "Art Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "8",
        "name": "Helicopter Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    ]
    res.json(events);

});


router.get('/special', verifyToken, (req, res) => {
    let events = [{
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "3",
        "name": "Car Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "4",
        "name": "Plane Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "5",
        "name": "Train Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "6",
        "name": "Lego Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "7",
        "name": "Art Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    {
        "_id": "8",
        "name": "Helicopter Expo",
        "description": "lorem ipsum",
        "date": "2019-04-23T18:25:43.511Z"
    },
    ]
    res.json(events);

});


module.exports = router;