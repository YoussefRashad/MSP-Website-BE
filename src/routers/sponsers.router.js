
const router = require('express').Router();
const Sponser = require('../models/sponsers.model')

router.get('/', async (req, res) => {
    try {
        const sponsers = await Sponser.find({})
        res.status(200).send(sponsers)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const sponser = await Sponser.findById(_id)
        if (!sponser) {
            return res.status(404).send()
        }
        res.status(200).send(sponser)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const sponser = new Sponser({ ...req.body })
        await sponser.save()
        res.status(200).send(sponser)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}, (error, req, res, next) => res.status(404).send({ error: error.message }))

router.patch('/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'link', 'image']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))
    if (!isAllowed) {
        return res.status(404).send()
    }
    try {
        const sponser = await Sponser.findOne({ _id })
        if (!sponser) {
            return res.status(404).send()
        }
        updates.forEach(update => sponser[update] = req.body[update])
        await sponser.save()
        res.status(200).send(sponser)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const sponser = await Sponser.findByIdAndDelete(_id)
        if (!sponser) {
            return res.status(404).send()
        }
        res.status(200).send(sponser)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})




module.exports = router;