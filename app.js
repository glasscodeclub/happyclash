
var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    session                 = require("express-session"),
    User                    = require("./models/user.models"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Authroutes              = require("./routes/auth.routes"),
    Homeroutes              = require("./routes/home.routes"), 
    Dashboardroutes         = require("./routes/dashboard.routes"),
    Videoroutes             = require("./routes/video.routes"), 
    Uploadroutes            = require("./routes/upload.routes"),
    Careerroutes            = require("./routes/career.routes"),
    Notoficationroutes      = require("./routes/notification.routes"),
    Adminroutes             = require("./routes/admin.routes"),
    Resultroutes            = require("./routes/result.routes"),
    Searchroutes            = require("./routes/search.routes")
    
var app = express();
const port = 3000;
const secret = process.env.SECRET || "Rusty is the best dog in the worldpassport";


const url = `mongodb+srv://hos:Target@1@cluster0.c7rpd.mongodb.net/HappyClash?retryWrites=true&w=majority`||"mongodb://localhost/happyclashdb";

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect(url,connectionParams)
    .then( () => {
    
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret,
    resave: false,
    saveUninitialized: false
}));//env

app.set('view engine','ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./public"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.render('Homemodule/start');
})

app.get('/links',(req,res)=>{
    res.redirect('/home');
})

app.get('/videomode',(req,res)=> {
    res.render("Videomodule/videomode",{page:"Video Mode"});
})

// app.get('/drive',(req,res)=> {
//     res.render("Drivemodule/drive",{page:"HappyClash Drive"})
// })

app.get('/homefeed',(req,res)=> {
    res.render("Feedmodule/feedhome",{page:"HappyClash homefeed",url:req.url})
})

app.get('/library',(req,res)=> {
    res.render("Librarymodule/library",{url:req.url});
})

app.get('/profile',(req,res)=> {
    res.render("Profilemodule/profile",{url:req.url});
})

app.get('/challenge',(req,res)=> {
    res.render("Feedmodule/challenge",{url:req.url});
})

app.get('/clashDetails',(req,res)=> {
    res.render("Clashmodule/clashDetails",{url:req.url});
})

app.get('/participants',(req,res)=> {
    res.render("Clashmodule/participants",{url:req.url});
})
app.get('/comments',(req,res)=> {
    res.render("Clashmodule/clashComments",{url:req.url});
})

//Kushagra

app.get('/reportClash', (req, res)=>{
    res.render("Kushagra/reportClash",{url:req.url});
})
app.get('/createNewClash', (req, res)=>{
    res.render("Kushagra/newClash",{url:req.url});
})



app.use('/auth',Authroutes);
app.use('/dashboard',Dashboardroutes);
app.use('/home',Homeroutes);
app.use('/upload',Uploadroutes);
app.use('/video',Videoroutes);
app.use('/career', Careerroutes);
app.use("/notification", Notoficationroutes);
app.use("/admin", Adminroutes);
app.use("/results", Resultroutes)
app.use("/search", Searchroutes)

app.listen(port, function(){
    console.log("connected on : ",port," mongo url : ",url);
});