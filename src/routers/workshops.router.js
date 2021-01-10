
const router = require('express').Router();
const Workshop = require('../models/workshops.model')

router.get('/', async (req, res) => {
    try {
        const workshops = await Workshop.find({})
        res.status(200).send(workshops)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const workshop = await Workshop.findById(_id)
        if (!workshop) {
            return res.status(404).send()
        }
        res.status(200).send(workshop)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const workshop = new Workshop({ ...req.body })
        await workshop.save()
        res.status(200).send(workshop)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}, (error, req, res, next) => res.status(404).send({ error: error.message }))

router.patch('/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'location']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))
    if (!isAllowed) {
        return res.status(404).send()
    }
    try {
        const workshop = await Workshop.findOne({ _id })
        if (!workshop) {
            return res.status(404).send()
        }
        updates.forEach(update => workshop[update] = req.body[update])
        await workshop.save()
        res.status(200).send(workshop)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const workshop = await Workshop.findByIdAndDelete(_id)
        if (!workshop) {
            return res.status(404).send()
        }
        res.status(200).send(workshop)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = router;