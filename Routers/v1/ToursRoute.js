const express = require("express");
const toursController = require("../../Controllers/ToursController");
const CheapestTours = require("../../Middlewares/CheapTours");
const TopViewed = require("../../Middlewares/TopViewed");
const ViewsCounter = require("../../Middlewares/ViewsCounter");
const Tours = require("../../Models/ToursSchema");
const router = express.Router();

router
  .route("/tours")
  //@desc get all Tours
  //@Route GET=api/v1/tours
  //@ public
  .get(toursController.getAllQueryTours)
  //@desc create Tours
  //@Route POST=api/v1/tours
  //@ public
  .post(toursController.createTouer);
//@desc get details Tours
//@Route GET=api/v1/tours/id
//@ public ViewsCounter
router.get("/tours/:id", ViewsCounter, toursController.getDetailsTour);
//@desc get 3  cheapeast Tours
//@Route GET=api/v1/tours/cheapeast
//@ public
router.get("/tour/cheapest", CheapestTours, toursController.getAllQueryTours);
//@desc get 3  trendint top views Tours
//@Route GET=api/v1/tour/trending
//@ public
router.get("/tour/trending", TopViewed, toursController.getAllQueryTours);
//@desc update Tour
//@Route PATCH=api/v1/tour/:id
//@ public
router.patch("/tour/:id", toursController.UpdateTour);
module.exports = router;
