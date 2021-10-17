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

router.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const updateAllowed = ['fullname', 'email', 'password']
    const isValid = updates.every((update) => updateAllowed.includes(update))

    if (!isValid) {
        res.status(404).send({ error: 'Invalid Updated!' })
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.status(200).send({message: 'User Upadated!'})
    } catch (error) {
        res.status(404).send({message: "User not found"})
    }

    res.send(update)
    console.log(req.params.id)
})

module.exports = router