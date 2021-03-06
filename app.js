
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    User = require("./models/user.models"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Authroutes = require("./routes/auth.routes"),
    Videoroutes = require("./routes/video.routes"),
    Uploadroutes = require("./routes/upload.routes"),
    Careerroutes = require("./routes/career.routes"),
    Searchroutes = require("./routes/search.routes"),
    Libraryroutes = require("./routes/library.routes"),
    Homeroutes = require("./routes/home.routes"),
    ClashDetailsroutes = require("./routes/ClashDetails.routes"),
    createclashroute = require("./routes/createclash.routes"),
    Cameraroute = require("./routes/camera.routes"),
    Imageroutes = require("./routes/img.routes"),
    Uploadimageroutes = require("./routes/uploadimage.routes")  

var app = express();
const port = 3000;
const secret = process.env.SECRET || "Rusty is the best dog in the worldpassport";

//mongo URL
const url = `mongodb+srv://hos:Target@1@cluster0.c7rpd.mongodb.net/HappyClash?retryWrites=true&w=majority` || "mongodb://localhost/happyclashdb";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

mongoose.connect(url, connectionParams)
    .then(() => {

    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(require("express-session")({
    secret,
    resave: false,
    saveUninitialized: false
}));//env

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('Authmodule/start');
})

app.get('/links', (req, res) => {
    res.render('Authmodule/links');
})

app.use('/auth', Authroutes);//
app.use("/library", Libraryroutes);//
app.use("/home", Homeroutes);//
app.use("/Clashdetails", ClashDetailsroutes)//

app.use('/career', Careerroutes);//
app.use("/createclash", createclashroute)//
app.use("/search", Searchroutes)//
app.use('/camera', Cameraroute);

app.use('/upload', Uploadroutes);
app.use('/video', Videoroutes);
app.use('/image', Imageroutes);
app.use('/uploadimage', Uploadimageroutes);

app.use('/error', (req, res) => {
    const { message, status } = req.query
    res.render("error", { error: "", url: req.url, message, status })
});
app.listen(port, function () {
    console.log("connected on : ", port, " mongo url : ", url);
});
