const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const users = require("./routers/api/users");

mongoose
  .connect("mongodb://localhost:27017/vue-node", { useNewUrlParser: true })
  .then(() => {
    console.log("ok")
  })

const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(users);

app.get('/',(req,res) => {
  res.send('hello 123')
})

app.listen(port, () => {
  console.log(`serve is running on port ${port}`);
});
3