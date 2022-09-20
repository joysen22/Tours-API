const Tours = require("../Models/ToursSchema");

const ViewsCounter = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Tours.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
    next();
  } catch (error) {
    res.status(400).send({
      status: "faild",
      message: "error invalid id",
    });
  }
};
module.exports = ViewsCounter;
