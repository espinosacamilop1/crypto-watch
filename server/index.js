const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000;

const db = require('./db')

// Packages used for authentication (Session & Passport)
const session = require('express-session');
const passport = require('passport');

// Passport initial setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}))
app.use(bodyParser.json())

require('./config/passport');

app.use(
    session({
      secret: 'some secret goes here',
      resave: true,
      saveUninitialized: false
    })
  );

app.use(passport.initialize());
app.use(passport.session());

db.on('error', console.error.bind(console, 'db connection error:'))

//set up all my routes
const authRouter = require('./routes/auth.routes');
app.use('/', authRouter)
const coinRouter = require('./routes/coin.routes');
app.use('/', coinRouter)
const userRouter = require('./routes/user.routes');
app.use('/', userRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))