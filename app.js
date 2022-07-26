const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.URI, { useNewUrlParser: true });
const postSchema = {
    title: String,
    content: String,
}; // Schema for the post
const Post = mongoose.model("Post", postSchema);

const about =
    "This is a Blog Website. You can add a Blog and view all the posts by clicking on 'Read More'.";
const contact =
    "You can contact me by emailing me at purtiagarwal88@gmail.com or you can contact me at purtiagarwal.me !";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    Post.find({}, function (err, posts) {
        res.render("home", { posts: posts });
    });
});
app.get("/about", function (req, res) {
    res.render("about", { write: about });
});
app.get("/contact", function (req, res) {
    res.render("contact", { write: contact });
});
app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.titleText,
        content: req.body.postText,
    });
    post.save();
    res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("page", {
            name: post.title,
            content: post.content,
        });
    });
});

app.listen(process.env.PORT || 3000, function (req, res) {});
