if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');



const expreeError = require('./utils/ExpressError.js');

const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user.js');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash')

const listingsRoutes = require('./routes/listings.js');
const reviewsRoutes = require('./routes/reviews.js');
const userRoutes = require('./routes/users.js');



// const MONGO_URI = "mongodb://127.0.0.1:27017/wonderlust";
const dbUrl=process.env.ATLAS_DB;



main().then(() => {
    console.log("Connected to MongoDB");
}
).catch(err => {
    console.error("MongoDB connection error:", err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600, // time period in seconds
    crypto: {
        secret: 'thisshouldbeasecret'
    }
});
//for session store error handing
store.on('err',()=>{
    console.log("session store error", err);
})


const sessionOptions = {
    store: store,
    name: 'session',
    // name: 'session', // default is 'connect.sid'
    // store: MongoStore.create({ mongoUrl: dbUrl }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
}
);

// app.get('/fakeUser', async (req, res) => {
//     const user = new User({ 
//         email: 'shivani@gmail.com', 
//         username: 'shivani'
//     });
//     const newUser = await User.register(user, 'shivani');
//     res.send(newUser);
// }
// );

app.use('/listings', listingsRoutes);
app.use('/listings/:id/reviews', reviewsRoutes);
app.use('/', userRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 8080");
}
);

// home page
// app.get('/',(req, res) => {
//     res.send('Home Page');
// }
// );


app.all("/:id", (req, res,next) => {
    // 
    next(new expreeError(404, "This page does not exist"));
}
);

app.use((err,req, res, next) => {
    const {statusCode=400, message="page not found"} = err;
    res.status(statusCode).send(message);
}
);

