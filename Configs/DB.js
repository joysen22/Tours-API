const mongoose = require("mongoose");
const ConnectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`mongodb connect success`);
  } catch (error) {
    console.log(`mongodb connect failed => ${error.message}`);
  }
};
module.exports = ConnectDB;
