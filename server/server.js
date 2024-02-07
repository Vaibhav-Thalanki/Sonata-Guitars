const express = require("express");
const app = express();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");
require("dotenv").config();
const { handleError, convertToApiError } = require("./middleware/apiError");
const passport = require("passport");
const { jwtStrategy } = require("./middleware/passport");
const path = require("path");

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

// body parser
app.use(express.json());
// sanitize - middlewares
app.use(xss());
app.use(mongoSanitize());

//passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// routes
app.use("/api", routes);

// handle errors
app.use((err, req, res, next) => {
  convertToApiError(err, next);
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

// for deployment



if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

   });

}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
