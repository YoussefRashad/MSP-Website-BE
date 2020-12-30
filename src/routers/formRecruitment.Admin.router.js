
const router = require('express').Router()
const FormRecruitment = require('../models/formRecruitment.Admin.model')

router.get('/', async (req, res) => {
    try {
        const formRecruitments = await FormRecruitment.find({})
        res.status(200).send(formRecruitments)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    const newFormRecruitment = new FormRecruitment({ ...req.body, open: true })
    try {
        await FormRecruitment.deleteMany()
        await newFormRecruitment.save()
        res.status(200).send(newFormRecruitment)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/close', async (req, res) => {
    try {
        const formRecruitments = await FormRecruitment.deleteMany()
        const closeTheForm = new FormRecruitment({ open: false })
        await closeTheForm.save()
        res.status(200).send(closeTheForm)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router;