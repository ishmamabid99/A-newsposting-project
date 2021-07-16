const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require("./routes/postRoutes");
const app = express();
const router = express.Router();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const url = process.env.URL

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },(err)=>{
      if(!err) console.log("Mongoose Connected Successfully");
      else {
          console.log(err);
      }
});
app.use('/',postRoutes);


const port = process.env.PORT | 8080
app.listen(port,()=>{
    console.log("app listening to the port");
})