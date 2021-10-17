const router = require('express').Router()
const User = require('../models/user.model')

router.post('/singup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const response = await new User({ fullname, email, password }).save()
        res.send(response)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router