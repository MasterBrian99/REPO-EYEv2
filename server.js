//jshint esversion:6

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
let type;
let avatar_url;
let login;
let html_url;
let name;
let bio;
let followers;
let following;
let created_at;
let dat;
let updated_at;
let lastLogin;




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

                var option = {
                    url: info.owner.url,
                    headers: {
                        'User-Agent': 'repo-eye'
                    }
                };


                function callbacks(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        usrInfo = JSON.parse(body);

                        type = usrInfo.type;
                        avatar_url = usrInfo.avatar_url;
                        login = usrInfo.login;
                        html_url = usrInfo.html_url;
                        name = usrInfo.name;
                        bio = usrInfo.bio;
                        followers = usrInfo.followers;
                        following = usrInfo.following;

                        dat = usrInfo.created_at.split("T");
                        created_at = dat[0];

                        lastLogin = usrInfo.updated_at.split("T");
                        updated_at = lastLogin[0];

                        res.redirect("/info");
                    }

                };

                request(option, callbacks);

                //      res.redirect("/info");

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



    res.render("pages/info", {
        type: type,
        avatar_url: avatar_url,
        login: login,
        html_url: html_url,
        name: name,
        bio: bio,
        followers: followers,
        following: following,
        created_at: created_at,
        updated_at: updated_at
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