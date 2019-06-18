const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const config = require("./config/db");
var opts = {
  connectTimeoutMS: 20000,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true
};

//Conect with  mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(config.db, opts)
  .then(db => console.log("Conexión con la base de datos establecida..."))
  .catch(err =>
    console.log(`Error al intentar conectarse a la base de datos:
    ${err}`)
  );

const db = mongoose.connection;

//Initializations
const api = require("./routes");

//Middleawares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
//Session
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Send message for default URL
app.get("/", (req, res) =>
  res.send("Hello World with Express in Aplicaciones Interactivas")
);

// Load the routes
app.use("/users", api);

// Launch app to listen to specified port
app.listen(config.port, function() {
  console.log("Running RestHub on port " + config.port);
});
