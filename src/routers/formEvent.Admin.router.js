
const router = require('express').Router();
const FormEvent = require('../models/formEvent.Admin.model')

router.get('/', async (req, res) => {
    try {
        const formEvents = await FormEvent.find({})
        res.status(200).send(formEvents)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    const newFormEvent = new FormEvent({ ...req.body, open:true })
    try {
        await FormEvent.deleteMany()
        await newFormEvent.save()
        res.status(200).send(newFormEvent)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/close', async (req, res) => {
    try {
        const formEvents = await FormEvent.deleteMany()
        const closeTheForm = new FormEvent({ open: false })
        await closeTheForm.save()
        res.status(200).send(closeTheForm)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router;