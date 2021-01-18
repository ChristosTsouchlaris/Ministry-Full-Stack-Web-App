const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Login = require('./models/login');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
const session = require('express-session')
const flash = require('connect-flash');

const userRoutes = require('./routes/users')
const infoRoutes = require('./routes/info');
const ministryRoutes = require('./routes/ministry');

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
app.use(flash());

app.use(express.urlencoded({extended: true}))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user;
    console.log(res.locals.currentUser);
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', userRoutes);
app.use('/info', infoRoutes)
app.use('/', ministryRoutes)

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/employee', (req, res) => {
    res.render('employee/employee');
})

app.get('/employee-specific-leave-form.ejs', (req, res) => {
    res.render('employee/employee-specific-leave-form.ejs');
})

app.get('/employer', (req, res) => {
    res.render('employer/employer');
})

app.get('/employer_profile/:id' , (req, res) => {
    res.render('employerProfile/employer');
})

app.get('/employer_profile/:id/employer_staff' , (req, res) => {
    res.render('employerProfile/employer-staff');
})

app.get('/employee_profile/:id' , (req, res) => {
    res.render('employeeProfile/employee');
})

app.get('/under_construction', (req, res) => {
    res.render('under-construction');
})

app.get('/test', async (req, res) => {
    const log = new Login({name: "Kostas", password: "sdsd"});
    await log.save();
    res.send(log)
})

app.get('/secret', async (req, res) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in');
        return res.redirect('/login')
    }
    res.send('SECRET')
})

app.listen(8080, () => {
    console.log('Serving on port 8080')
})