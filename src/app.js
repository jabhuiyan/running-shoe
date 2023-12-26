require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const clientRouter = require("./routes/clientRouter");
const usersRouter = require("./routes/usersRouter");
const shoesRouter = require("./routes/shoesRouter");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const db = process.env.DB || "mongodb://127.0.0.1:27017/runningshoerepo";

mongoose.connect(db, {}, (err) => {
  if (!err) {
    console.log("MongoDB has connected successfully.");
  } else {
    console.log(err);
  }
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

mongoose.Promise = global.Promise;

require("./auth/auth");

const app = express();

// Methods to use json get, post etc.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// Frontend routes
app.set("view engine", "ejs"); // View template engine for the application
app.set("views", path.join(__dirname, "views")); // Views directory
app.use(express.static("public")); // Directory that serves static files
app.get("/", function (req, res) {
  res.render("./index");
});
app.use("/ui", clientRouter);

// Backend routes
app.use("/api/users", usersRouter);
app.use("/api/shoes", shoesRouter);

server = app.listen(port, () => {
  console.log("Example app listening at http://localhost:%d", port);
});
