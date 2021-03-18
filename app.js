
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
    Dashboardroutes         = require("./routes/dashboard.routes");
    Uploadroutes         = require("./routes/upload.routes");
    
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
    res.redirect('/home');
})

app.get('/start',(req,res)=> {
    res.render("Feedmodule/start");
})

app.get('/feed',(req,res)=> {
    res.render("Feedmodule/feed",{page:"Feed | HappyClash"});
})

app.get('/drive',(req,res)=> {
    res.render("Feedmodule/drive",{page:"HappyClash Drive"})
})

app.get('/homefeed',(req,res)=> {
    res.render("Feedmodule/feedhome",{page:"HappyClash homefeed"})
})

app.get('/library',(req,res)=> {
    res.render("Feedmodule/library");
})

app.get('/profile',(req,res)=> {
    res.render("Profilemodule/profile");
})

app.use('/auth',Authroutes);
app.use('/dashboard',Dashboardroutes);
app.use('/home',Homeroutes);
app.use('/upload',Uploadroutes);

app.listen(port, function(){
    console.log("connected on : ",port," mongo url : ",url);
});