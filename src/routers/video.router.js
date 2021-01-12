
const router = require('express').Router()
const VideoModel = require('../models/video.model')

router.get('/', async (req, res) => {
    try {
        const videos = await VideoModel.find({})
        res.status(200).send(videos)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const video = await VideoModel.findById(id)
        if (!video) {
            return res.status(404).send()
        }
        res.status(200).send(video)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const video = new VideoModel({ ...req.body })
        await video.save()
        res.status(200).send(video)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'link', 'description', 'attatchement', 'committee', 'defaultImage']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))
    if (!isAllowed) {
        return res.status(404).send()
    }
    try {
        const video = await VideoModel.findOne({ _id })
        if (!video) {
            return res.status(404).send()
        }
        updates.forEach(update =>{
            if(update === 'attatchement'){
                video[update] = [...video[update], req.body[update]]
            }else{
                video[update] = req.body[update]
            }
        })
        await video.save()
        res.status(200).send(video)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.patch('/comment-form/:id', async(req, res)=>{
    if(!req.body.comments){
        return res.status(404).send()
    }
    const id = req.params.id
    try{
        const video = await VideoModel.findById(id)
        if(!video){
            return res.status(404).send()
        }
        video.comments = [...video.comments, req.body.comments]
        await video.save()
        res.status(200).send(video)
    }catch(error){
        console.log(error);
        res.status(500).send({ error: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const video = await VideoModel.findByIdAndDelete(_id)
        if (!video) {
            return res.status(404).send()
        }
        res.status(200).send(video)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = router