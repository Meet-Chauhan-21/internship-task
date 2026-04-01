const express = require("express");
const mongoose = require("mongoose");
const FileRoutes = require("./src/routes/file.route");
const path = require("path");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine","ejs")
app.set("views",path.resolve("./src/views"))


app.use("/file", FileRoutes);


// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// server connection
app.listen(process.env.PORT, () => {
  console.log(`server runing on port ${process.env.PORT}`);
});
