const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

mongoose.connect(
    "mongodb+srv://admin-purti:Purti*55@cluster0.chge8.mongodb.net/blogDB",
    { useNewUrlParser: true }
);
const postSchema = {
    title: String,
    content: String,
}; // Schema for the post
const Post = mongoose.model("Post", postSchema);

const homeSection =
    "This is the home section of the Blog Website. This is where you can view all blogs.";
const about =
    "This is a Blog Website. You can add a Blog by adding '/compose' in the url and view all the posts by clicking on 'Read More'.";
const contact =
    "This is the contact section. You can contact me by emailing me at purtiagarwal88@gmail.com or you can contact me at purtiagarwal.me";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    Post.find({}, function (err, posts) {
        res.render("home", { write: homeSection, posts: posts });
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
