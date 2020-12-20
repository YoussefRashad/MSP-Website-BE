
const router = require('express').Router();
const Event = require('../models/events.model');
const upload = require('../middleware/upload')

router.get('/', async (req, res)=>{
    try{
        const events = await Event.find({})
        res.status(200).send(events)
    }catch(error){
        res.status(500).send({ error: error.message})
    }
})

router.get('/:id', async (req, res)=>{
    const _id = req.params.id
    try{
        const event = await Event.findById(_id)
        if(!event){
            return res.status(404).send()
        }
        res.status(200).send(event)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', upload.single('image'), async (req, res)=>{
    try{
        const event = new Event({ ...req.body})
        // event.image = req.file.buffer
        await event.save()
        res.status(200).send(event)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}, (error, req, res, next) => res.status(404).send({ error: error.message }))

router.patch('/:id', async (req, res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'location']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))
    if(!isAllowed){
        return res.status(404).send()
    }
    try{
        const event = await Event.findOne({_id})
        if(!event){
            return res.status(404).send()
        }
        updates.forEach(update => event[update] = req.body[update])
        await event.save()
        res.status(200).send(event)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res)=>{
    const _id = req.params.id;
    try{
        const event = await Event.findByIdAndDelete(_id)
        if (!event) {
            return res.status(404).send()
        }
        res.status(200).send(event)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})




module.exports = router;