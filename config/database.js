const mongoose = require("mongoose");

exports.connect = () => {
  // Connecting to the database

  mongoose
    .connect(process.env.DATABASE_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(console.log("Database connected..."))
    .catch((er) => console.log(er));
};
