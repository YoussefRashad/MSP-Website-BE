
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/MSP-Tech-Club',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// "mongodb+srv://YoussefRashad:0000112@msp-tech-club.cfjku.mongodb.net/MSP-Tech-Club?retryWrites=true&w=majority"
// 'mongodb://127.0.0.1:27017/MSP-Tech-Club'