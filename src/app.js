
const express = require('express')
const cors = require('cors')
const app = express()
require('./DB/connection')

app.use(express.json())

// Access Api
// https://msp-tech-club-egypt.netlify.app
// origin:['http://localhost:3000','http://127.0.0.1:3000']
const URL = require('./utils/URL').FE_URL

app.use(cors({
    origin: [URL, URL],
    credentials: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', URL +', https://msp-tech-club-egypt2.netlify.app');
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})


// Routers
const articleRouter = require('./routers/articles.router')
const eventRouter = require('./routers/events.router')
const sponsorRouter = require('./routers/sponsors.router')
const workshopRouter = require('./routers/workshops.router')
const feedbackRouter = require('./routers/feedback.router')
const formEvent = require('./routers/formEvent.router')
const formRecruitment = require('./routers/formRecruitment.router')
const formEventAdmin = require('./routers/formEvent.Admin.router')
const formRecruitmentAdmin = require('./routers/formRecruitment.Admin.router')
const userRouter = require('./routers/user.router')
const videoRouter = require('./routers/video.router')


app.use('/articles', articleRouter)
app.use('/events', eventRouter)
app.use('/sponsors', sponsorRouter)
app.use('/workshops', workshopRouter)
app.use('/feedback', feedbackRouter)
app.use('/form-event-admin', formEventAdmin)
app.use('/form-recruitment-admin', formRecruitmentAdmin)
app.use('/form-event', formEvent)
app.use('/form-recruitment', formRecruitment)
app.use('/user', userRouter)
app.use('/video', videoRouter)

app.use((req, res)=>{
    res.status(400).send()
})


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`server is up on port ${PORT}`))