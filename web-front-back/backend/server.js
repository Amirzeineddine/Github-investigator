const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

connectDB();
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
