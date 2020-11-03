//jshint esversion:6


//f092f8ec7f2e9c29f0484d93f35ffe3662a86f86

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const app = express();
const userController = require('./controllers/UserController');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let info;
let repoName;
let usrInfo;




app.get("/", function(req, res) {
    res.render("pages/index", {
        type: "repository"
    });


});

app.post("/", function(req, res) {

    repoName = req.body.repoUrl;

    if (repoName == "") {

        res.redirect("/");

    } else {
        var options = {
            url: 'https://api.github.com/repos/' + repoName,

            headers: {
                'User-Agent': 'repo-eye'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                info = JSON.parse(body);
                console.log("done");
                res.redirect("/info");

                //  console.log(info.forks_count + " Forks");
            } else {
                console.log("failed");

                res.redirect("/");
            }
        };

        var s = request(options, callback);
        console.log(s);

    }




});

app.get("/info", function(req, res) {
    var options = {
        url: info.owner.url,
        headers: {
            'User-Agent': 'repo-eye'
        }
    };
    let type;
    let avatar_url;
    let login;
    let html_url;
    let name;
    let bio;

    function callback(error, response, body) {
        usrInfo = JSON.parse(body);

    };

    request(options, callback);


    type = usrInfo.type;
    avatar_url = usrInfo.avatar_url;
    login = usrInfo.login;
    html_url = usrInfo.html_url;
    name = usrInfo.name;
    bio = usrInfo.bio;

    res.render("pages/info", {
        type: type,
        avatar_url: avatar_url,
        login: login,
        html_url: html_url,
        name: name,
        bio: bio
    });
});





app.listen(3000, function() {

    console.log("Server started on port 3000.");
});


/*
    const data = octokit.repos
        .listForOrg({
            org: "octokit",
            type: "public",
        })
        .then(({
            data
        }) => {
            console.log(data);
            // handle data
        });




*/