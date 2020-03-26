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
  `mongodb://localhost/nagarjuna-admin-management`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) return console.log(err);
    else console.log("Database: Connected => Nagarjuna-Admin-Management");
  }
);

app.use("/api/admin/accounts", require("./routes/accounts"));
app.use("/api/admin/semester", require("./routes/semester"));

// unknown request
app.use((req, res) => {
  res.status(404).json({
    msg: "404 API not found!"
  });
});

const PORT = process.env.PORT || 1999;
http.createServer(app).listen(PORT, () => {
  console.log(`Server: Running => ${PORT}`);
});
