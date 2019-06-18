const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

//initializations
const app = require("./app");
const api = require("./routes");

//middleawares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Send message for default URL
app.get("/", (req, res) =>
  res.send("Hello World with Express in Aplicaciones Interactivas")
);

// Indicamos a la app que utilice las rutas de los end points generados por api
app.use("/users", api);
