const mongoose = require("mongoose");

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required."],
      unique: [true, "Name bust be unique."],
      trim: true,
      minLength: [3, "Name must be at least 3, got {VALUE}"],
      maxLength: [100, "Name is too large, got {VALUE}"],
    },
    price: {
      type: Number,
      required: [true, "Price must be required."],
      min: [1, "Price can not be negative, got {VALUE}."],
    },

    image: {
      type: String,
      required: [true, "Image must be required."],
    },
    desc: {
      type: String,
      required: [true, "Description must required."],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tours = mongoose.model("tour", toursSchema);
module.exports = Tours;
