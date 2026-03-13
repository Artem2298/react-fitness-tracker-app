const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

router.get('/', trainingController.getTrainings);
router.get('/public', trainingController.getPublicTrainings);
router.get('/user/:userId', trainingController.getUserTrainings);
router.get('/:id', trainingController.getSpecificTraining);
router.post('/', trainingController.createTraining);
router.delete('/:id', trainingController.deleteTraining);
router.patch('/:id', trainingController.updateTraining);

module.exports = router;
