const app = require("express")();
const http = require("http");

require("dotenv").config();

// parse the json formats
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// show the requests
app.use(require("morgan")("dev"));

// cross request resolver
app.use(require("cors")());

require("mongoose").connect(
  `mongodb://localhost/nagarjuna-college-management`,
  // `mongodb+srv://sangya2058:Carrier@g00gle@cluster0-yypwi.mongodb.net/nagarjuna-college-management?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) return console.log(err);
    else console.log("Database: Connected => nagarjuna-college-management");
  }
);

//auth middleware
const {userTokenValidation} = require("./middleware/authentication");

// api paths
// app.use("/api/admin/accounts", require("./routes/accounts"));
app.use("/api/admin/accounts", userTokenValidation, require("./routes/accounts"));
app.use("/api/admin/semester", userTokenValidation, require("./routes/semester"));
app.use("/api/admin/applications", userTokenValidation, require("./routes/applications"));
app.use("/api/admin/authentication", require("./routes/authentication"));

const path = require('path');
app.use(require("express").static(path.join(__dirname, 'client/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// unknown request
app.use("/api",(req, res) => {
  res.status(404).json({
    msg: "404 API not found!"
  });
});

const PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT, () => {
  console.log(`Server: Running => ${PORT}`);
});
