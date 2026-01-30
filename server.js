var express = require("express");
var app = express();
var cors = require('cors');
var session = require("express-session")
var bodyParser = require("body-parser")
var userMiddleware = require("./middlewares.js/user")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'key', cookie: { maxAge: 60000 } }))
app.use(express.static(__dirname + "/pages"));

app.get("/", userMiddleware.authenticate, function (req, res) {
    if (req.session.user) {
        res.sendFile(__dirname + "/pages/Home.html")
    }
    else {
        res.redirect("/login")
    }
})

app.post("/login", userMiddleware.authenticate, function (req, res) {
    req.session.user = { id: req.user.id, username: req.user.username };
     res.redirect("/");
  });


app.get("/products", userMiddleware.authenticate, function (req, res) {
    res.sendFile(__dirname + "/pages/Products.html")
})

// app.get("/",function(req,res){
//     req.session.MYNAME="Uma"
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     console.log(req.session);
//     console.log(req.sessionID);

//     res.send(`Your Browser Request Count is ${req.session.count}`)
// });

app.listen(3000, function () {
    console.log("Server Running On 3000");
})