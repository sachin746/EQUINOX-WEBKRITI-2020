var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");


    mongoose.connect("mongodb://localhost/yoyo")
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(bodyparser.urlencoded({ extended: true }));
    
    app.use(function (req, res, next) {
        res.locals.currentUser = req.user;
        next();
    })
    
    


app.get("/",function(req,res){
    res.render("home");
})

app.get("/book",function(req,res){
      res.render("bookambulance");
})

app.post("/book",function(req,res){


})


// render sign up page
app.get("/register", function(req,res) {
    res.render("register");
});

app.get("/login", function(req,res) {
    res.render("login");
});



//show register form===========================================================================================
app.get("/register", function (req, res) {
    res.render("register");
});
// handel a signup logic ======================

app.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/addbook")
        })
    })
})

//show login form===========================================================================================
app.get("/login", function (req, res) {
    res.render("login");
});

//handle login logic========================
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res) {

    })

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }


app.listen(3000,function(){
    console.log("server has started on port 3000");
})