const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql")

const app = express();
const PORT = 1024

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultlayout: "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "rootroot", 
    database: "burger_db"
})

connection.connect(function(err) {
    if (err) throw err;

    console.log("connected")
})

app.get("/", function(req, res) {
    connection.query("SELECT * FROM burger", function(err, data) {
        if (err) {
            return res.status(500).end();
        }

        const devouredBurgers = data.filter(burger => burger.devoured === 1);
        const burgers = data.filter(burger => burger.devoured === 0);

        res.render("index", {burgers: burgers, devouredBurgers: devouredBurgers});
    })
})

app.listen(PORT, function() {
    console.log("Server listening...")
})

