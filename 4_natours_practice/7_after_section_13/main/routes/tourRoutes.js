// 4) routes 🔍✅

const { Router } = require('express');
const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authContoller');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID );

// implementing simple nested route

// POST /tour/2345r/reviews
// GET /tour/2345r/reviews
// GET /tour/2345r/reviews/46737eda

// router
// .route('/:tourId/reviews')
// .post(
//   authController.protect,
//   authController.restrictTo('user'),
//   reviewController.createReview
// );

router.use('/:tourId/reviews', reviewRouter);

// tours route
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

// geospatial query
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-distance?distance=233&center=-40,45&unit=mi
//tours-distance/233/center/-45,45/unit/mi   - standard

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

//chanining middleware
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide') ,
    tourController.uploadTourImages ,
    tourController.resizeTourImages ,
    tourController.updateTour  
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
