const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const User = require("./Schemas/userSchema");
const Schema = require("./Schema.js");
const ExpressError = require("./Schemas/ExpressError.js");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chess');
}


app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const validate = (req, res, next) => {
    let {error} = Schema.validate(req.body);
    if(error) {
        throw new ExpressError(404, error.message);
    } else {
        next();
    }
}
app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/play/member", (req, res) => {
    res.render("member.ejs");
})

app.get("/play/signup", (req, res) => {
    res.render("signup.ejs");
})

app.get("/play/login", (req, res) => {
    res.render("login.ejs");
})

app.get("/play/online", async (req, res) => {
    let {email, password} = req.query;
    let result = await User.findOne({email, password});
    // console.log(result);
    if(result == null) {
        res.redirect("/play/member");
    } else {
        res.render("online.ejs");
    }
})

app.post("/play/online", validate, async (req, res) => {
    let {username, email, password} = req.body;
    let user = new User({
        username, email, password
    });
    let result = await user.save();
    // console.log(result);
    res.render("online.ejs");
})

app.use((err, req, res, next) => {
    let {status, message} = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("server is listening");
})

