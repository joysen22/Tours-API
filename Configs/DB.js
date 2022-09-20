const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const DB_URL = process.env.MDB_URL;
    const conn = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connect success`);
  } catch (error) {
    console.log(`mongodb connect failed => ${error.message}`);
  }
};
module.exports = ConnectDB;
