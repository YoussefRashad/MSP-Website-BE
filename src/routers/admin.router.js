
const router = require('express').Router()
const Admin  = require('../models/admin.model')

// get all admins
router.get('/', async (req, res) => {
    try{
        const admins = await Admin.find({})
        res.status(200).send(admins)
    }catch(error){
        res.status(500).send({ error: error.message })
    }
})

// get an admin
router.get('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const admin = await Admin.findById(id)
        if(!admin){
            return res.status(404).send()
        }
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// create an admin, sign-up
router.post('/signup', async (req, res) => {
    const admin = new Admin({ ...req.body })
    try {
        await admin.save()
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// login as an admin
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// logout from all devices
router.post('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// logout from a device
router.post('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// update an admin
router.patch('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// delete an admin
router.delete('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = router