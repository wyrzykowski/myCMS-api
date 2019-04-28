const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const appName  = process.env.APP_NAME;


router.post(`/${appName}/users`, async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post(`/${appName}/users/login`, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post(`/${appName}/users/logout`, auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

router.post(`/${appName}/users/logoutAll`, auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

//get all users
router.get(`/${appName}/users`, auth, async (req, res) => { //this firstly run middleware auth function and if no errors there send users list
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
});

//return user information, takes user information from token, middleware auth find user
router.get(`/${appName}/users/me`, auth, async (req, res) => { //this firstly run middleware auth function and if no errors there send users list
    res.send(req.user);
});

router.patch(`/${appName}/users/me`, auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
});

// router.delete(`/${appName}/users/me`, auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// });

module.exports = router;