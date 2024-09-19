const express = require("express");
const dontenv = require("dotenv").config();
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
var cors = require("cors");

connectDb();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5176",
  })
);

app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
