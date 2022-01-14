const mongoose = require("mongoose");
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://AleemAlam:AleemAlam@cluster0.a5f0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
};

module.exports = connect;
