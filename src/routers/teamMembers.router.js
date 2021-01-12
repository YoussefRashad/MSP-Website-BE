
const router = require('express').Router();
const TeamMember = require('../models/teamMembers.model')

router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({})
        res.status(200).send(teamMembers)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const teamMember = await TeamMember.findById(_id)
        if (!teamMember) {
            return res.status(404).send()
        }
        res.status(200).send(teamMember)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/',async (req, res) => {
    try {
        const teamMember = new TeamMember({ ...req.body })
        await teamMember.save()
        res.status(200).send(teamMember)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}, (error, req, res, next) => res.status(404).send({ error: error.message }))

router.patch('/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'word', 'season', 'position', 'image', 'feature']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))
    if (!isAllowed) {
        return res.status(404).send()
    }
    try {
        const teamMember = await TeamMember.findOne({ _id })
        if (!teamMember) {
            return res.status(404).send()
        }
        updates.forEach(update => teamMember[update] = req.body[update])
        await teamMember.save()
        res.status(200).send(teamMember)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const teamMember = await TeamMember.findByIdAndDelete(_id)
        if (!teamMember) {
            return res.status(404).send()
        }
        res.status(200).send(teamMember)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})




module.exports = router;