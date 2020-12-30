
const router = require('express').Router()
const FormRecruitment = require('../models/formRecruitment.model')

router.get('/', async (req, res) => { 
    try{
        const formRecruitments = await FormRecruitment.find({})
        res.status(200).send(formRecruitments)
    }catch(error){
        res.status(500).send({ error: error.message })
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const formRecruitment = await FormRecruitment.findById(id)
        res.status(200).send(formRecruitment)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
router.post('/', async (req, res) => {
    const newFormRecruitment = new FormRecruitment({ ...req.body })
    try {
        await newFormRecruitment.save()
        res.status(200).send(newFormRecruitment)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/delete-all', async (req, res) => {
    try {
        const formRecruitments = await FormRecruitment.deleteMany()
        res.status(200).send(formRecruitments)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const formRecruitment = await FormRecruitment.findByIdAndDelete(id)
        res.status(200).send(formRecruitment)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router;