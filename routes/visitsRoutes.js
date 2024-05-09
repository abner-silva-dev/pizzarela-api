const express = require('express');
const router = express.Router();
const visitController = require('./../controllers/visitsController');

router
  .route('/')
  .get(visitController.getNumVisits)
  .post(visitController.setNumVisits);

module.exports = router;
