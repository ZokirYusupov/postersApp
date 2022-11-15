const express = require('express');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const helpers = require('./utils/hbsHelpers')
const connectDb = require('./config/db')
const helmet = require('helmet');
const compression = require('compression')
// env variables
dotenv.config();
//connecting database
connectDb() 

// routes
const homeRoutes = require('./routes/homeRoutes')
const posterRoutes = require('./routes/posterRoutes')



const path = require('path')

const app = express();

// initlazi session store
const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGO_URI
  // expires: 126099090
})


// express core middlewares
app.use( express.json() )
app.use( express.urlencoded( {extended: false} ) )

// register helper
helpers(Handlebars)
// session configure
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
}))


app.use(flash())
app.use(helmet())
app.use(compression(2222))

// static file
app.use( express.static(path.join(__dirname, 'public')) )

// handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');



// routes initilazi
app.use('/', homeRoutes )
app.use('/posters', posterRoutes )
app.use('/auth', require('./routes/auth.routes'))
app.use('/profile', require('./routes/profile.routes'))


const PORT = process.env.PORT ||8080

// server is run
app.listen(PORT, console.log(`Server running on port http://localhost:${PORT}`))