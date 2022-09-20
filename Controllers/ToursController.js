const Tours = require("../Models/ToursSchema");

//@desc create Tours
//@Route POST=api/v1/tours
//@ public
exports.createTouer = async (req, res, next) => {
  try {
    const newTour = Tours(req.body);
    const result = await newTour.save();

    res.status(201).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next({ status: 400, message: `${error}` });
  }
};
//@desc get all Tours
//@Route GET=api/v1/tours
//@ public
exports.getAllQueryTours = async (req, res, next) => {
  try {
    // BUILD QUERY
    // 1) Filtering
    const queryObj = { ...req.query };
    const incluctField = ["sort", "fields", "page", "limit"];
    incluctField.forEach((field) => delete queryObj[field]);
    // 2) Advance Filtering
    let Filtering = JSON.stringify(queryObj);
    Filtering = Filtering.replace(
      /\b(lt|lte|gt|gte|eq)\b/g,
      (match) => `$${match}`
    );
    Filtering = JSON.parse(Filtering);

    // rouet get
    let query = Tours.find(Filtering);
    // 2) sorting
    if (req.query.sort) {
      let sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    // //3)Fields select
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    // 4)limit & page
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (skip >= (await Tours.countDocuments())) {
      return next({ status: 404, message: "Page not found" });
    }
    // const toursLength = await Tours.countDocuments();
    //   const features = new APIFeatures(Tours.find(), req.query, toursLength)
    // .filter()
    // .sort()
    // .select()
    // .paginate();
    //   const result = await features.query;
    const result = await query;
    res.status(200).json({
      status: "suceess",
      data: result,
    });
  } catch (error) {
    next({ status: 500, message: `${error}` });
  }
};

//@desc get details Tours
//@Route GET=api/v1/tours/id
//@ public ViewsCounter
exports.getDetailsTour = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Tours.findById(id);
    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    return next({ status: 400, message: `${error}` });
  }
};
//@desc update Tour
//@Route PATCH=api/v1/tour/:id
//@ public
exports.UpdateTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Tours.findByIdAndUpdate(
      id,
      { $set: req.body },
      { runValidators: true },
      { new: true }
    );
    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next({ status: 400, message: `${error}` });
  }
};
