//IMPORTS from PACKAGES
const express = require("express");
const mongoose = require("mongoose");

//IMPORTS from FILES
const authRouter = require("./routes/auth.js");
const adminRouter = require("./routes/admin.js");

//INIT
const PORT = 3000;
const app = express();
const DB =
  "mongodb+srv://parthwrkmahajan:parth2003@cluster0.pw47sss.mongodb.net/?retryWrites=true&w=majority";
//MIDDLEWARE
app.use(express.json()); //returns a middleware that parses json and only looks at requests
//  where the Content-Type header matches the type option
app.use(authRouter);
app.use(adminRouter);
// connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
