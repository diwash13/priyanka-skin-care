require('dotenv').config()
const express = require ('express')
const session = require ('express-session')
const massive = require ('massive')

const uc = require ('./controllers/userController')
const rc = require ('./controllers/reviews_controller')

const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

app.use(express.json())
app.use(session({
    store:new pgSession({
        pool: pgPool
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1231232223211
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log('Sweeettt'))
})

app.post('/auth/register', uc.register)
app.post('/auth/login', uc.login)
app.post('/auth/logout', uc.logout)

app.get('/api/current', uc.getUser)

app.get('/api/reviews', rc.getAll)
app.get('/api/review/:id', rc.getReview)
app.post('/api/review', rc.addReview)
app.delete('/api/review/:id', rc.deleteReview)
app.put('/api/review/:id', rc.updateReview)