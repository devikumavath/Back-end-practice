// 4) routes 🔍✅

const { Router } = require('express');
const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID );




// tours route

router.route('/top-5-cheap').get(tourController.aliasTopTours , tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);


router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);  //chanining middleware

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
