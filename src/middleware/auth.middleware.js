const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decode = jwt.verify(token, process.env.TOKEN_AUTH)
    const user = await User.findOne({_id: decode._id, 'tokens.token': token})

    if(!user){
        res.status(404).send('User not found.')
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
      res.status(401).send({error: 'please authonticate.'})
  }
}

module.exports = auth