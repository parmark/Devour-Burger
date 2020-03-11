const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql")

const app = express();
const PORT = 1024

app.use(express.urlendcoded({ extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultlayout: "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "rootroot", 
    database: burger_db
})

connection.connect(function(err) {
    if (err) throw err;

    console.log("connected")
})

app.listen(PORT, function() {
    console.log("Server listening...")
})

