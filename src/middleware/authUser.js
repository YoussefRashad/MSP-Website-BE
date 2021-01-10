const jwt   = require('jsonwebtoken')
const User = require('../models/user.model') 

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        if(!token){
            throw new Error({ error: "token" })
        }

        const decode = jwt.verify(token, 'thisismytokensignaturetoken')
        const user = await User.findOne({_id: decode._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        
        // to using in MWs 
        req.user = user
        req.token = token

        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate!' })
    }
}

module.exports = auth