
const express = require('express')
const cors = require('cors')
const app = express()
require('./DB/connection')

app.use(express.json())

// Access Api
// https://msp-tech-club-helwan.netlify.app/
// origin:['http://localhost:3000','http://127.0.0.1:3000'],
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})


// Routers
const articleRouter = require('./routers/articles.router')
const eventRouter = require('./routers/events.router')
const sponserRouter = require('./routers/sponsers.router')
const teamMemberRouter = require('./routers/teamMembers.router')
const workshopRouter = require('./routers/workshops.router')
const feedbackRouter = require('./routers/feedback.router')


app.use('/articles', articleRouter)
app.use('/events', eventRouter)
app.use('/sponsers', sponserRouter)
app.use('/team-members', teamMemberRouter)
app.use('/workshops', workshopRouter)
app.use('/feedback', feedbackRouter)


app.use((req, res)=>{
    res.status(400).send()
})


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`server is up on port ${PORT}`))