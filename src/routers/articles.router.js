
const router = require('express').Router();
const Article = require('../models/articles.model')
const upload = require('../middleware/upload')

// get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({})
        res.status(200).send(articles)
    }
    catch(error){
        res.status(500).send({error: error.message})
    }
})
// get an article
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const article = await Article.findById(id)
        if (!article) {
            return res.status(404).send()
        }
        res.status(200).send(article)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/:id/image', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const article = await Article.findById(id)
        if (!article || !article.image) {
            return res.status(404).send()
        }
        console.log(article.image);
        res.set('Content-Type', 'image/JPG')
        res.status(200).send(article.image)
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// create an article
router.post('/', upload.single('image'), async (req, res) => {
    try{
        const article = new Article({...req.body})
        //article.image = req.file.buffer
        await article.save()
        res.status(200).send(article)
    }
    catch (error) {
        res.status(500).send({error: error.message})
    }
}, (error, req, res, next)=> res.status(404).send({error: error.message}))

// update an article
router.patch('/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'author']
    const isAllowed = updates.every((update)=> allowedUpdates.includes(update))
    if(!isAllowed){
        return res.status(404).send()
    }

    try{
        const article = await Article.findOne({_id})
        if(!article){
            return res.status(404).send()
        }
        updates.forEach(update => article[update] = req.body[update])
        await article.save()
        res.status(200).send(article)
    }
    catch (error) {
        res.status(500).send({error: error.message})
    }
})

// delete an article
router.delete('/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const article = await Article.findByIdAndDelete(_id)
        if(!article){
            return res.status(404).send()
        }
        res.status(200).send(article)
    }
    catch (error) {
        res.status(500).send({error: error.message})
    }
})


module.exports = router;