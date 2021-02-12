require("dotenv").config();

const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const EARTH_API_KEY = process.env.EARTH_API_KEY;

app.set("view engine", 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);

app.get("/", (req, res) => {
  res.send("Hi there.");
});

//Routes
app.use('/users', require('./controllers/users'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});