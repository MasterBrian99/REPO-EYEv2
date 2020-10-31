//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
var UserController = require('./controllers/UserController');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



app.get("/", function(req, res) {
    res.render("pages/index", {
        type: "repository"
    });

});

app.post("/", function(req, res) {

    console.log("post complete");

});




app.get("/users", function(req, res) {
    res.render("pages/index", {
        type: "user"
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});