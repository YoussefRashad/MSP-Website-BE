
const router = require('express').Router();
const Sponsor = require('../models/sponsors.model')

router.get('/', async (req, res) => {
    try {
        const sponsors = await Sponsor.find({})
        res.status(200).send(sponsors)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const sponsor = await Sponsor.findById(_id)
        if (!sponsor) {
            return res.status(404).send()
        }
        res.status(200).send(sponsor)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const sponsor = new Sponsor({ ...req.body })
        await sponsor.save()
        res.status(200).send(sponsor)
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
        const sponsor = await Sponsor.findOne({ _id })
        if (!sponsor) {
            return res.status(404).send()
        }
        updates.forEach(update => sponsor[update] = req.body[update])
        await sponsor.save()
        res.status(200).send(sponsor)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const sponsor = await Sponsor.findByIdAndDelete(_id)
        if (!sponsor) {
            return res.status(404).send()
        }
        res.status(200).send(sponsor)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})




module.exports = router;