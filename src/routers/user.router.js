const router = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')


// Singup user
router.post('/singup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const user = await new User({ fullname, email, password }).save()
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

// Update User
router.patch('/user/:id', async (req, res) => {

    // checking valid update fields
    const updates = Object.keys(req.body)
    const allowedField = ['fullname', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedField.includes(update))

    if (!isValidUpdate) {
        res.status(400).send({ message: 'Invalid Update fields' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            res.status(400).send({ message: 'Invalid Update' })
        }
        res.send({ message: 'User Updated!', user })

    } catch (error) {
        res.status(400).send({ message: 'Something went wrong', error: error.message })
    }

})

module.exports = router