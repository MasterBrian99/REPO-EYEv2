//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let info;
let repoName;
let usrInfo;
let created_at;
let lastLogin;


app.get("/", function(req, res) {
    res.render("pages/index");

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

                var option = {
                    url: info.owner.url,
                    headers: {
                        'User-Agent': 'repo-eye'
                    }
                };

                function callbacks(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        usrInfo = JSON.parse(body);
                        res.redirect("/info");
                    }

                };

                request(option, callbacks);


            } else {
                res.redirect("/");
            }
        };

        request(options, callback);

    }




});

app.get("/about", function(req, res) {
    res.redirect("/");
});


app.get("/info", function(req, res) {

    let dat = usrInfo.created_at.split("T");
    created_at = dat[0];

    lastLogin = usrInfo.updated_at.split("T");
    let updated_at = lastLogin[0];
    let repoSizeOriginal;

    if (info.size < 1024) {
        repoSizeOriginal = info.size + " KB";

    } else {

        repoSizeOriginal = Math.round(info.size / 1024).toFixed(1) + " MB";

    }

    res.render("pages/info", {
        type: usrInfo.type,
        avatar_url: usrInfo.avatar_url,
        login: usrInfo.login,
        html_url: usrInfo.html_url,
        name: usrInfo.name,
        bio: usrInfo.bio,
        followers: usrInfo.followers,
        following: usrInfo.following,
        created_at: created_at,
        updated_at: updated_at,
        name: info.name,
        default_branch: info.default_branch,
        description: info.description,
        language: info.language,
        size: repoSizeOriginal,
        forks_count: info.forks_count,
        subscribers_count: info.subscribers_count,
        open_issues_count: info.open_issues_count,
        stargazers_count: info.stargazers_count,
        git_url: info.git_url,
        ssh_url: info.ssh_url,
        clone_url: info.clone_url,
        svn_url: info.svn_url

    });
});



app.listen(3000, function() {

});