const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("polio"));
app.use(bodyParser.urlencoded({ extended: true }));
// above we write to use the bodyParser package which we installed
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appKey = "0fd966e923e29d3d717c231a26dd14bb";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const link = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1> The temperature of " + query + " is " + temp + " Celcius</h1>"
      );
      res.write(
        "<h2> The weather of " + query + " is " + weatherDescription + "</h2>"
      );
      res.write("<img src=" + link + ">");
    });
  });
});

app.listen(5000, function () {
  console.log("Server is running at 5000");
});
