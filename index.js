const cors = require("cors");
const { google } = require("googleapis");
const customsearch = google.customsearch("v1");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`backend is listening on port ${port}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // change this if your dir structure is different
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.post("/search", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("please enter the email ");
  }

  const options = {
    q: req.body.email,
    apiKey: process.env.API2,
    cx: process.env.CX2,
  };

  async function runSample(options) {
    // console.log(options);
    const result = await customsearch.cse.list({
      cx: options.cx,
      q: options.q,
      auth: options.apiKey,
    });
    // console.log(result.data);
    return res.status(200).send(result.data);
  }

  runSample(options).catch(console.error);
});
