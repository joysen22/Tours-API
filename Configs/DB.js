const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const DB_URL = process.env.MDB_URL;
    const url =
      "mongodb+srv://my-Tours:JQxqcVKGkFWx9jJu@cluster0.gcuiy.mongodb.net/Tours-app?retryWrites=true&w=majority";
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connect success`);
  } catch (error) {
    console.log(`mongodb connect failed => ${error.message}`);
  }
};
module.exports = ConnectDB;
