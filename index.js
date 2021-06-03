const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const morgan = require("morgan");

// Middlwares
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// .env
const port = process.env.PORT || 8000;

// connection
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connected..."))
  .catch((er) => console.log(er));

// call routers
app.use("/v1", require("./router/member_router"));

// information
app.listen(port, () => {
  console.log("server Activited");
});
