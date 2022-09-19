const mongoose = require("mongoose");

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be required."],
  },
});
