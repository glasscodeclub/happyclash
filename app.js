var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user.models"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Authroutes              = require("./routes/auth.routes"),
    Homeroutes              = require("./routes/home.routes"), 
    Dashboardroutes         = require("./routes/dashboard.routes")
    
var app = express();
const port=5000;
mongoose.connect("mongodb://localhost/happyclashdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
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
app.use('/auth',Authroutes);
app.use('/dashboard',Dashboardroutes);
app.use('/home',Homeroutes);

app.listen(port, function(){
    console.log("connected on : ",port);
});