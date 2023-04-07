const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authContoller')

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'devi',
//   });
// });

router.use(authController.isLoggedIn)

router.get('/', viewsController.getOverview);

router.get('/tour/:slug', viewsController.getTour);

router.get('/login' , viewsController.getLoginForm);

module.exports = router;
