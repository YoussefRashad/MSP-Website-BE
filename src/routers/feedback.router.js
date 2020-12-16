
const router = require('express').Router();
const Feedback = require('../models/feedback.model')

router.get('/', async (req, res) =>{
    try{
        const feedbacks = await Feedback.find({})
        res.status(200).send(feedbacks)
    }catch(error){
        res.status(500).send({ error: error.message })
    }
})
router.get('/:id', async(req,res)=>{
    try {
        const feedback = await Feedback.findById(req.params.id)
        if(!feedback){
            return res.status(404).send()
        }
        res.status(200).send(feedback)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
router.post('/', async(req,res)=>{
    try {
        const feedback = new Feedback({...req.body})
        await feedback.save()
        res.status(200).send(feedback)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router