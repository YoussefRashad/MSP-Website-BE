
const mongoose = require('mongoose');

const formEventAdminSchema = new mongoose.Schema({
    questions: {
        type: [mongoose.Schema.Types.Mixed]
    },
    open: {
        type: Boolean,
        default: false
    }
})



const form = new mongoose.model('FormEventAdmin', formEventAdminSchema)

module.exports = form