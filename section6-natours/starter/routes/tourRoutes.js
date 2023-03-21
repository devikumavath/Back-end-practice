// 4) routes 🔍✅

const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID );




// tours route
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody , tourController.createTour);  //chanining middleware

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
