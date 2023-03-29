// 4) routes 🔍✅

const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authContoller');



const router = express.Router();
// users route

router.post('/signup' , authController.signup);

router.post('/login' , authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getuser)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);

module.exports = router;
