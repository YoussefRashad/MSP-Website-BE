
const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    attatchement: {
        type: [{
            title: String,
            link: String
        }],
        trim: true
    },
    committee:{
        type: String,
        required: true,
        trim: true,
        validate(val) {
            const sections = {
                technical: ['preparation', 'flutter', 'game development', 'data science'],
                operational: ['human resources', 'quality assurance', 'logistics'],
                marketing: ['graphic design', 'photography & video production', 'digital marketing']
            }
            console.log(val);
            if ((!sections.technical.includes(val.toLowerCase()))) {
                if ((!sections.operational.includes(val.toLowerCase()))) {
                    if ((!sections.marketing.includes(val.toLowerCase()))) {
                        throw new Error()
                    }
                }
            }
        }
    },
    defaultImage:{
        type: String,
        required: true,
        trim: true
    },
    comments: {
        type: [{
            name: String, image: String, title: String, comment: String,
            rate: Number, evaluate: Number, date: String
        }],
        default: []
    },
    feature:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const VideoModel = new mongoose.model('Video', videoSchema)

module.exports = VideoModel