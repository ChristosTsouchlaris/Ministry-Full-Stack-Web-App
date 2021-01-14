const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Login = require('./models/login');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
// const flash = require('req-flash');

const userRoutes = require('./routes/users')
const info = require('./routes/info');

mongoose.connect('mongodb://localhost:27017/ypakp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'));
// app.use(flash());

app.use(express.urlencoded({extended: true}))

app.use('/info', info)

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/ministry/contact', (req, res) => {
    res.render('ministry/contact')
})

app.get('/ministry/rendezvous', (req, res) => {
    res.render('ministry/rendezvous')
})

app.get('/test', async (req, res) => {
    const log = new Login({name: "Kostas", password: "sdsd"});
    await log.save();
    res.send(log)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})