
const router = require('express').Router();
const FormEvent = require('../models/formEvent.model')

router.get('/', async(req, res)=>{
    try{
        const formEvents = await FormEvent.find({})
        res.status(200).send(formEvents)
    }catch(error){
        res.status(500).send({ error: error.message })
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const formEvent = await FormEvent.findById(id)
        res.status(200).send(formEvent)
    }catch(error){
        res.status(500).send({ error: error.message })
    }
})
router.post('/', async (req, res) => {
    const newFormEvent = new FormEvent({ ...req.body })
    try{
        await newFormEvent.save()
        res.status(200).send(newFormEvent)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/delete-all', async (req, res) => {
    try {
        const formEvents = await FormEvent.deleteMany()
        res.status(200).send(formEvents)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const formEvent = await FormEvent.findByIdAndDelete(id)
        res.status(200).send(formEvent)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router;