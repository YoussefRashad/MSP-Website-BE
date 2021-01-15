
const router = require('express').Router()
const User  = require('../models/user.model')
const authUser = require('../middleware/authUser')

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// get all team crew
router.get('/crew', async (req, res) => {
    try {
        const users = await User.find({})
        const crew = users.filter(user => !['member', 'other'].includes(user.privilage.positionType))
        res.status(200).send(crew)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// get me
router.get('/me', authUser, async(req, res)=>{
    // res.send({ userData: req.user,  token: req.token })
    res.send(req.user)
})

// get an User
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// create an user, sign-up
router.post('/signup', async (req, res) => {
    try {
        const user = new User({ ...req.body })
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// login as an user
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findByCredential(email, password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// logout from all devices
router.post('/logout-all', authUser, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// logout from a device
router.post('/logout', authUser, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => req.token !== token.token )
        await req.user.save()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// update an user
router.patch('/me', authUser, async (req, res) => {
    const updates   = Object.keys(req.body)
    const allowedUpdates = ['userName', 'email', 'password', 'quote', 'season', 'feature', 'privilage', 'positionType', 'section', 'committee', 'image', 'linkedIn', 'image']
    
    const isAllowed = updates.every((update)=> allowedUpdates.includes(update))
    if(!isAllowed){
        throw new Error()
    }

    try{
        updates.forEach(update =>{
            if (update === 'privilage'){ // if the property is privileage
                // if privilage is available (true or as a string)
                if (req.body['privilage'] === 'true' || req.body['privilage'] === true){
                    req.user['privilage'] = { positionType: req.body['positionType'], section: req.body['section'], committee: req.body['committee'] }
                }
            } else if (update === 'positionType' || update === 'section' || update === 'committee') {
                // to skip these properties
            }else{
                req.user[update] = req.body[update]
            }
        })

        await req.user.save()
        res.status(200).send(req.user)
    }catch(error){
        res.status(500).send({ error: error.message })
    }
})

// delete an user
router.delete('/me', authUser, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = router