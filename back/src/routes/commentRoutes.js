// src/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentControllers');

router.post('/', commentController.createComment);
router.get('/', commentController.getComments);
router.get('/:id', commentController.getSpecificComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
